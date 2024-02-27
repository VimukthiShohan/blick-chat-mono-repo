import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

const ChatList = () => {
  const chatListData = [
    { id: 1, name: 'John Doe', online: true },
    { id: 2, name: 'Jane Smith', online: false },
    { id: 3, name: 'Jane Smith', online: false },
    { id: 4, name: 'Jane Smith', online: false },
    { id: 5, name: 'Jane Smith', online: false },
    { id: 6, name: 'Jane Smith', online: false },
    { id: 7, name: 'Jane Smith', online: false },
    { id: 8, name: 'Jane Smith', online: false },
    { id: 9, name: 'Jane Smith', online: false },
    { id: 10, name: 'Jane Smith', online: false },
    { id: 11, name: 'Jane Smith', online: false },
    { id: 12, name: 'Jane Smith', online: false },
    { id: 13, name: 'Jane Smith', online: false },
    { id: 14, name: 'Jane Smith', online: false },
    { id: 15, name: 'Jane Smith', online: false },
    { id: 16, name: 'Jane Smith', online: false },
    { id: 17, name: 'Jane Smith', online: false },
    { id: 18, name: 'Jane Smith', online: false },
    { id: 19, name: 'Jane Smith', online: false },
    { id: 20, name: 'Jane Smith', online: false },
  ];

  return (
    <List className="overflow-y-auto">
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
