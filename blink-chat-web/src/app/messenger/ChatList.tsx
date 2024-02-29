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

import { useGetConversations } from '@/api/coversation';

const ChatList = () => {
  const { data: chatListData } = useGetConversations();

  return (
    <List className="overflow-y-auto">
      {chatListData?.length === 0 ? (
        <div className="flex justify-center items-center">
          <Typography>No conversations yet</Typography>
        </div>
      ) : (
        chatListData?.map((chat) => (
          <ListItem key={chat.conversationId}>
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
  );
};

export default ChatList;
