'use client';

import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useSocket from '@/utils/useSocket';
import { User } from '@/types/user.types';
import { Nullable } from '@/api/apiService';
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
}

const ChatList: React.FC<ChatListProps> = ({
  setSelectedConversation,
  unselectConversation,
  currentUser,
}) => {
  const { socket } = useSocket();

  const { data: chatListData, isLoading, refetch } = useGetConversations();

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
            chatListData?.map((chat) => (
              <ListItem
                key={chat.conversationId}
                onClick={() => {
                  setSelectedConversation(chat);
                }}
                className={`bg-${unselectConversation?.conversationId === chat.conversationId ? 'blue-100' : 'white'} border-b border-t border-gray-300`}
              >
                <ListItemAvatar>
                  <Avatar />
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
