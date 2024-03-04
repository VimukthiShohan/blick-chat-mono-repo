'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, IconButton, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useQueryClient } from '@tanstack/react-query';

import ChatList from './ChatList';
import Conversation from './Conversation';
import { Nullable } from '@/api/apiService';
import { getUser } from '@/utils/cacheStorage';
import ProfileModal from '@/components/ProfileModal';
import { ConversationResponse } from '@/types/conversation.types';

const MessengerLayout = () => {
  const router = useRouter();
  const currentUser = getUser();
  const queryClient = useQueryClient();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Nullable<ConversationResponse>>(null);

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    queryClient.clear();
    queryClient.resetQueries();
    router.push('/login');
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-50 flex">
        <div
          className={
            'bg-gray-50 w-20 px-4 py-2 border-b border-r border-gray-300 flex'
          }
        >
          <div className="flex justify-between items-center flex-col">
            <Avatar className="mt-2" onClick={handleOpenProfileModal} />
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col h-full w-full relative">
          <ChatList
            setSelectedConversation={(conversation) =>
              setSelectedConversation(conversation)
            }
            unselectConversation={selectedConversation}
            currentUser={currentUser}
          />
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
            selectedConversation={selectedConversation}
            closeConversation={() => setSelectedConversation(null)}
            currentUser={currentUser}
          />
        </Paper>
      </div>

      {isProfileModalOpen ? (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfileModal}
          user={currentUser}
        />
      ) : null}
    </div>
  );
};

export default MessengerLayout;
