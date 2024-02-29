'use client';

import { Modal, Button, TextField, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { User } from '@/types/user.types';
import { useUpdateUser } from '@/api/user';
import { useSnack } from '@/utils/useSnack';
import { saveUser } from '@/utils/cacheStorage';
import LoadingButton from '@/components/LoadingButton';
import { VALIDATION_MSG } from '@/config/responseMessage';

const validationSchema = Yup.object({
  firstName: Yup.string().required(VALIDATION_MSG.F_NAME_REQ),
  lastName: Yup.string().required(VALIDATION_MSG.L_NAME_REQ),
});

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Omit<User, 'createdAt'>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { showErrSnack } = useSnack();

  const { isLoading, mutate } = useUpdateUser({
    onSuccess: (data) => {
      saveUser(data);
      modalOnClose();
    },
    onError: (err) => showErrSnack(err),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.profilePic);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const modalOnClose = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={modalOnClose}
      className="fixed inset-0 flex items-center justify-center"
      title={'Edit profile'}
    >
      <div className="w-96 bg-white p-4 rounded-lg">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex justify-center items-center flex-col">
            <Avatar
              alt={user?.firstName}
              src={profilePicture}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            {isEditing && (
              <Button variant="contained" component="label">
                Upload Picture
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    // Handle file upload
                    console.log('File uploaded:', e.target.files);
                  }}
                />
              </Button>
            )}
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <TextField label="Email" value={user?.email} disabled fullWidth />
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && (
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading}
              >
                Save
              </LoadingButton>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileModal;
