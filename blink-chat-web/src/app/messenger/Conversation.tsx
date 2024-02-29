import React, { useState } from 'react';
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
import { Nullable } from '@/api/apiService';
import ProfileModal from '@/components/ProfileModal';
import { ConversationResponse } from '@/types/conversation.types';
import { useGetConversationMessages, useSendMessage } from '@/api/coversation';

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
  const { data: userData } = useGetUser(selectedConversation?.userEmail || '');
  const { data: conversationData, refetch } = useGetConversationMessages(
    selectedConversation?.conversationId || '',
  );
  const { mutate } = useSendMessage({
    onSuccess: () => {
      setMsg('');
      refetch();
    },
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <Paper variant="outlined" className="h-screen flex flex-col">
      {selectedConversation ? (
        <>
          <div className="flex p-2 justify-between bg-blue-500">
            <div className="flex flex-row">
              <Avatar
                src={selectedConversation.profilePic}
                alt={selectedConversation.userName}
                className="mt-1"
                onClick={handleOpenProfileModal}
              />
              <div className="flex flex-col ml-2">
                <Typography variant="h5">
                  {selectedConversation.userName}
                </Typography>
                <Typography variant="caption">
                  {true ? 'Online' : 'Offline'}
                </Typography>
              </div>
            </div>
            <IconButton onClick={() => closeConversation(null)}>
              <CloseIcon fontSize={'medium'} />
            </IconButton>
          </div>

          <div
            className="flex flex-col flex-grow overflow-y-auto p-4"
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
                    <Paper
                      key={index}
                      elevation={3}
                      className={clsx(
                        'p-2 m-2 max-w-[100%]',
                        msgObj.userEmail === currentUser.email
                          ? 'bg-blue-500 text-white text-right'
                          : 'bg-gray-200 text-left',
                      )}
                    >
                      {msgObj.msg}
                    </Paper>
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
              />
            </div>
            <div className="w-1/12 flex justify-center pb-2">
              <IconButton
                onClick={() =>
                  mutate({
                    conversationId: selectedConversation.conversationId,
                    msg,
                  })
                }
              >
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
