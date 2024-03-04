'use client';

import React from 'react';
import { Autocomplete, Modal, TextField, Typography } from '@mui/material';

import { Box } from '@mui/system';
import { Nullable } from '@/api/apiService';
import { useGetAllUsers } from '@/api/user';
import { User, UserInfoResponse } from '@/types/user.types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: (user: Nullable<UserInfoResponse>) => void;
  currentUser: User;
}

const StartChatModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  currentUser,
}) => {
  const { data: usersData } = useGetAllUsers();

  const modalOnClose = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={modalOnClose}
      className="fixed inset-0 flex items-center justify-center"
    >
      <Box
        height={'30%'}
        width={'40%'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#ffffff',
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
        }}
      >
        <Typography id="white-box-modal" variant="h6" component="h2">
          Start conversation
        </Typography>
        <Typography id="modal-with-white-box" sx={{ mt: 2, mb: 2 }}>
          Search this user for start the conversation
        </Typography>
        <Autocomplete
          options={
            usersData?.filter((user) => user.email !== currentUser.email) || []
          }
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Search user" />
          )}
          onChange={(_event, option) => selectedUser(option)}
        />
      </Box>
    </Modal>
  );
};

export default StartChatModal;
