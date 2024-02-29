'use client';

import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';

import { Nullable } from '@/api/apiService';
import { useGetConversations } from '@/api/coversation';
import { ConversationResponse } from '@/types/conversation.types';
import CircularProgress from '@mui/material/CircularProgress';

interface ChatListProps {
  setSelectedConversation: (chat: ConversationResponse) => void;
  unselectConversation: Nullable<ConversationResponse>;
}

const ChatList: React.FC<ChatListProps> = ({
  setSelectedConversation,
  unselectConversation,
}) => {
  const { data: chatListData, isLoading } = useGetConversations();

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
                className={`bg-${unselectConversation?.conversationId === chat.conversationId ? 'gray-400' : 'white'} border-b border-t border-gray-300`}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={chat.userName}
                  secondary={true ? 'Online' : 'Offline'}
                />
              </ListItem>
            ))
          )}
        </List>
      )}
    </>
  );
};

export default ChatList;
