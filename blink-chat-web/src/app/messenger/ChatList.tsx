import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

const ChatList: React.FC = () => {
  const chatListData = [
    { id: 1, name: 'John Doe', online: true },
    { id: 2, name: 'Jane Smith', online: false },
  ];

  return (
    <List>
      {chatListData.map((chat) => (
        <ListItem key={chat.id}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={chat.online ? 'Online' : 'Offline'}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
