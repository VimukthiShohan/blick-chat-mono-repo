import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import { useGetUser } from '@/api/user';
import { User } from '@/types/user.types';
import useSocket from '@/utils/useSocket';
import { Nullable } from '@/api/apiService';
import { SOCKET_EVENTS } from '@/config/constant';
import ProfileModal from '@/components/ProfileModal';
import { useGetConversationMessages, useSendMessage } from '@/api/coversation';
import {
  ConversationMessagesResponse,
  ConversationResponse,
} from '@/types/conversation.types';

interface ConversationProps {
  selectedConversation: Nullable<ConversationResponse>;
  closeConversation: (p: null) => void;
  currentUser: User;
}

const Conversation: React.FC<ConversationProps> = ({
  selectedConversation,
  closeConversation,
  currentUser,
}) => {
  const { socket } = useSocket();

  const conversationId = selectedConversation?.conversationId || '';

  const { data: userData } = useGetUser(selectedConversation?.userEmail || '');
  const { data } = useGetConversationMessages(conversationId);
  const { mutate } = useSendMessage({
    onSuccess: () => {
      setMsg('');
    },
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [conversationData, setConversationData] = useState<
    Array<ConversationMessagesResponse>
  >([]);

  useEffect(() => {
    setConversationData(data || []);
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, conversationId);
    }

    return () => {
      socket.emit(SOCKET_EVENTS.LEAVE_ROOM, conversationId);
    };
  }, [conversationId]);

  useEffect(() => {
    if (socket) {
      socket.on(
        SOCKET_EVENTS.CONVERSATION_MESSAGE,
        (msg: ConversationMessagesResponse) => {
          setConversationData((prevState) => [...prevState, msg]);
        },
      );
    }

    return () => {
      socket.off(SOCKET_EVENTS.CONVERSATION_MESSAGE);
    };
  }, []);

  const sendMessage = () => {
    mutate({ conversationId, msg });
    if (socket) {
      socket.emit(SOCKET_EVENTS.CONVERSATION_MESSAGE, {
        id: new Date(Date.now()).toString(),
        msg,
        userEmail: currentUser.email,
        conversationId,
      });
    }
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <Paper className="h-screen flex flex-col border-b border-gray-300">
      {selectedConversation ? (
        <>
          <div className="flex p-2 justify-between bg-blue-700">
            <div className="flex flex-row items-center">
              <Avatar
                src={selectedConversation.profilePic}
                alt={selectedConversation.userName}
                className="mt-1 mr-2 mb-1"
                onClick={handleOpenProfileModal}
              />
              <Typography variant="h5" className="text-white">
                {selectedConversation.userName}
              </Typography>
            </div>
            <IconButton onClick={() => closeConversation(null)}>
              <CloseIcon fontSize={'medium'} className="text-white" />
            </IconButton>
          </div>

          <div
            className="basis-[85%] overflow-y-scroll p-5 w-full flex flex-col gap-2"
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
          >
            {!conversationData || conversationData?.length === 0
              ? null
              : conversationData
                  .slice(0)
                  .reverse()
                  .map((msgObj, index) => (
                    <div
                      key={index}
                      className={clsx(
                        'flex flex-col items-end bg-blue-100 rounded-full',
                        msgObj.userEmail === currentUser.email
                          ? 'self-end rounded-br-none'
                          : 'self-start rounded-bl-none',
                      )}
                    >
                      {msgObj.msg && (
                        <div className="flex justify-center items-center px-3 py-1">
                          <p className="text-black">{msgObj.msg}</p>
                        </div>
                      )}
                    </div>
                  ))}
          </div>

          <div
            className="p-4 items-end flex flex-row"
            style={{ flexShrink: 0 }}
          >
            <div className="w-11/12">
              <TextField
                variant="outlined"
                fullWidth
                label="Type your message"
                value={msg}
                onChange={(event) => setMsg(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendMessage();
                }}
              />
            </div>
            <div className="w-1/12 flex justify-center pb-2">
              <IconButton onClick={sendMessage}>
                <SendIcon className="text-blue-500" fontSize={'large'} />
              </IconButton>
            </div>
          </div>
        </>
      ) : null}

      {isProfileModalOpen ? (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfileModal}
          user={userData}
        />
      ) : null}
    </Paper>
  );
};

export default Conversation;
