'use client';

import { FC } from 'react';
import NextLink from 'next/link';
import { Button, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { VALIDATION_MSG } from '@/config/responseMessage';

const validationSchema = Yup.object({
  email: Yup.string()
    .email(VALIDATION_MSG.EMAIL_INV)
    .required(VALIDATION_MSG.EMAIL_REQ),
  password: Yup.string().required(VALIDATION_MSG.PASS_REQ),
});

const LoginForm: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <p className="text-3xl mb-3 font-bold">Login to your Account</p>
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
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <NextLink href="/signup" passHref>
          <Link color="primary">Don't have an account? SignUp</Link>
        </NextLink>
      </div>
    </form>
  );
};

export default LoginForm;
