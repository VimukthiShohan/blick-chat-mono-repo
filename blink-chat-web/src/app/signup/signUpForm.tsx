'use client';

import { FC, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { TextField, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRegister } from '@/api/user';
import { useSnack } from '@/utils/useSnack';
import LoadingButton from '@/components/LoadingButton';
import { VALIDATION_MSG } from '@/config/responseMessage';
import { getUser, saveTokenInLocal, saveUser } from '@/utils/cacheStorage';

const validationSchema = Yup.object({
  firstName: Yup.string().required(VALIDATION_MSG.F_NAME_REQ),
  lastName: Yup.string().required(VALIDATION_MSG.L_NAME_REQ),
  email: Yup.string()
    .email(VALIDATION_MSG.EMAIL_INV)
    .required(VALIDATION_MSG.EMAIL_REQ),
  password: Yup.string().required(VALIDATION_MSG.PASS_REQ),
});

const SignUpForm: FC = () => {
  const router = useRouter();
  const currentUser = getUser();
  const { showErrSnack } = useSnack();

  const { isLoading, mutate } = useRegister({
    onSuccess: (data) => {
      const { accessToken, ...rest } = data;
      saveTokenInLocal(accessToken);
      saveUser(rest);
      router.push('/messenger');
    },
    onError: (err) => showErrSnack(err),
  });

  useEffect(() => {
    if (currentUser) {
      router.push('/messenger');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <p className="text-3xl mb-3 font-bold">Create your Account</p>
      <TextField
        fullWidth
        id="firstName"
        name="firstName"
        label="First Name"
        type="text"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
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
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <div className="flex justify-between">
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          Sign Up
        </LoadingButton>
        <NextLink href="/login" passHref>
          <Link color="primary">Already have an account? Login</Link>
        </NextLink>
      </div>
    </form>
  );
};

export default SignUpForm;
