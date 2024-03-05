'use client';

import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

import useSocket from '@/utils/useSocket';
import { User } from '@/types/user.types';
import { Nullable } from '@/api/apiService';
import { getImgUrl } from '@/utils/getImgUrl';
import { SOCKET_EVENTS } from '@/config/constant';
import { useGetConversations } from '@/api/coversation';
import {
  ConversationResponse,
  SocketNewConversationData,
} from '@/types/conversation.types';

interface ChatListProps {
  setSelectedConversation: (chat: ConversationResponse) => void;
  unselectConversation: Nullable<ConversationResponse>;
  currentUser: User;
  newChatStarted: boolean;
}

const ChatList: React.FC<ChatListProps> = ({
  setSelectedConversation,
  unselectConversation,
  currentUser,
  newChatStarted,
}) => {
  const { socket } = useSocket();

  const [searchQuery, setSearchQuery] = useState('');

  const { data: chatListData, isLoading, refetch } = useGetConversations();

  useEffect(() => {
    refetch();
  }, [newChatStarted]);

  useEffect(() => {
    if (socket) {
      socket.on(
        SOCKET_EVENTS.NEW_CONVERSATION,
        (socketData: SocketNewConversationData) => {
          const { receiverEmail } = socketData;
          if (receiverEmail === currentUser.email) {
            refetch();
          }
        },
      );
    }

    return () => {
      if (socket) {
        socket.off(SOCKET_EVENTS.NEW_CONVERSATION);
      }
    };
  }, [socket]);

  return (
    <>
      <Paper className="px-4 py-3 border-b border-gray-300 flex flex-row">
        <InputBase
          placeholder="Search"
          className="w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Paper>

      {isLoading ? (
        <div className="flex justify-center mt-3">
          <CircularProgress size={24} />
        </div>
      ) : (
        <List className="overflow-y-auto">
          {chatListData?.length === 0 ? (
            <div className="flex justify-center mt-3">
              <Typography>No conversations yet</Typography>
            </div>
          ) : (
            chatListData
              ?.filter((chat) =>
                chat.userName.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .reverse()
              ?.map((chat) => (
                <ListItem
                  key={chat.conversationId}
                  onClick={() => {
                    setSelectedConversation(chat);
                  }}
                  className={`bg-${unselectConversation?.conversationId === chat.conversationId ? 'blue-100' : 'white'} border-b border-t border-gray-300`}
                >
                  <ListItemAvatar>
                    <Avatar src={getImgUrl(chat.profilePic)} />
                  </ListItemAvatar>
                  <ListItemText primary={chat.userName} />
                </ListItem>
              ))
          )}
        </List>
      )}
    </>
  );
};

export default ChatList;
