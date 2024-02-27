import React from 'react';
import ChatList from './ChatList';
import Conversation from './Conversation';
import { Paper, InputBase, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';

const MessengerPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-200 flex">
        <Paper className="w-20 px-4 py-2 border-b border-gray-300 flex">
          <div className="flex justify-between items-center flex-col">
            <Avatar className="mt-2" />
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </div>
        </Paper>
        <div className="flex flex-col h-full w-full relative">
          <Paper className="px-4 py-3 border-b border-gray-300 flex flex-row">
            <InputBase
              placeholder="Search"
              className="w-full focus:outline-none"
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Paper>
          <ChatList />
          <div className="bottom-4 absolute right-4">
            <IconButton>
              <AddCircleRoundedIcon
                className="text-blue-500"
                fontSize={'large'}
              />
            </IconButton>
          </div>
        </div>
      </div>
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
