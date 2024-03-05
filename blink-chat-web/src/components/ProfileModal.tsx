'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Button, TextField, Avatar } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { User } from '@/types/user.types';
import { useSnack } from '@/utils/useSnack';
import LoadingButton from '@/components/LoadingButton';
import { getUser, saveUser } from '@/utils/cacheStorage';
import { VALIDATION_MSG } from '@/config/responseMessage';
import { useUpdateUser, useUserImgUpload } from '@/api/user';
import { getImgUrl } from '@/utils/getImgUrl';

const validationSchema = Yup.object({
  firstName: Yup.string().required(VALIDATION_MSG.F_NAME_REQ),
  lastName: Yup.string().required(VALIDATION_MSG.L_NAME_REQ),
});

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: Omit<User, 'createdAt'>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const currentUser = getUser();
  const { showErrSnack } = useSnack();

  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePic || null,
  );
  const [file, setFile] = useState<File>();

  const { isLoading, mutate } = useUpdateUser({
    onSuccess: (data) => {
      saveUser(data);
      modalOnClose();
    },
    onError: (err) => showErrSnack(err),
  });

  const { mutate: mutateProfileImg } = useUserImgUpload({
    onSuccess: (data) => {
      setProfilePicture(data);
    },
    onError: (err) => showErrSnack(err),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({ ...values, profilePic: profilePicture });
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [user, isOpen]);

  const modalOnClose = () => {
    setIsEditing(false);
    onClose();
  };

  useEffect(() => {
    uploadFile();
  }, [file]);

  const uploadFile = () => {
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
        const formData = new FormData();
        formData.append('file', file);

        mutateProfileImg(formData);
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={modalOnClose}
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="w-96 bg-white p-4 rounded-lg">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex justify-center items-center flex-col">
            <Avatar
              alt={user?.firstName}
              src={getImgUrl(profilePicture)}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            {isEditing && (
              <Button variant="contained" component="label">
                Upload Picture
                <input
                  type="file"
                  accept=".jpg"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
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
            {currentUser.email === user?.email && (
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            )}
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
