'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, IconButton, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useQueryClient } from '@tanstack/react-query';

import ChatList from './ChatList';
import Conversation from './Conversation';
import { Nullable } from '@/api/apiService';
import { useSnack } from '@/utils/useSnack';
import { getImgUrl } from '@/utils/getImgUrl';
import { getUser } from '@/utils/cacheStorage';
import ProfileModal from '@/components/ProfileModal';
import { useCreateConversation } from '@/api/coversation';
import StartChatModal from '@/app/messenger/StartChatModal';
import { ConversationResponse } from '@/types/conversation.types';

const MessengerLayout = () => {
  const router = useRouter();
  const currentUser = getUser();
  const { showErrSnack } = useSnack();
  const queryClient = useQueryClient();

  const [newChatStarted, setNewChatStarted] = useState(false);
  const [startChatModal, setStartChatModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Nullable<ConversationResponse>>(null);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, []);

  const { mutate } = useCreateConversation({
    onSuccess: (res) => {
      setSelectedConversation(res);
      setNewChatStarted(!newChatStarted);
      setStartChatModal(false);
    },
    onError: (err) => showErrSnack(err),
  });

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleCloseStartChatModal = () => {
    setStartChatModal(false);
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
            <Avatar
              className="mt-2"
              onClick={handleOpenProfileModal}
              src={getImgUrl(currentUser?.profilePic)}
            />
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
            newChatStarted={newChatStarted}
          />
          <div className="bottom-4 absolute right-4">
            <IconButton onClick={() => setStartChatModal(true)}>
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
            refetchChatList={() => setNewChatStarted(!newChatStarted)}
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

      {startChatModal ? (
        <StartChatModal
          isOpen={startChatModal}
          onClose={handleCloseStartChatModal}
          currentUser={currentUser}
          selectedUser={(user) => {
            if (user) mutate({ chatCandidate: user.email });
          }}
        />
      ) : null}
    </div>
  );
};

export default MessengerLayout;
