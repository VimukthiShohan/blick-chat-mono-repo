import React from 'react';
import ChatList from './ChatList';
import Conversation from './Conversation';
import { Paper, InputBase, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const MessengerPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-200 flex">
        {/* Ribbon */}
        <Paper className="w-1/6 px-4 py-2 border-b border-gray-300">
          <div className="flex justify-between items-center">
            {/* Profile */}
            <Avatar />
            {/* Logout Button */}
            <LogoutIcon />
          </div>
        </Paper>
        {/* Chat List */}
        <div className="w-5/6 flex flex-col h-full">
          {/* Search Bar */}
          <Paper className="px-4 py-2 border-b border-gray-300">
            <InputBase
              placeholder="Search"
              className="w-full focus:outline-none"
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Paper>
          {/* Chat List Items */}
          <ChatList />
          {/* Plus Button */}
          <div className="flex justify-end">
            <IconButton>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {/* Conversation */}
      <div className="w-2/3 bg-white">
        <Paper className="h-full">
          <Conversation
            online={true}
            profileName={'Vimukthi'}
            profilePic={''}
          />
        </Paper>
      </div>
    </div>
  );
};

export default MessengerPage;
