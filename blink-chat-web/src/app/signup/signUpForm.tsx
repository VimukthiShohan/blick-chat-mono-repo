'use client';

import { FC } from 'react';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { VALIDATION_MSG } from '@/config/responseMessage';

const validationSchema = Yup.object({
  firstName: Yup.string().required(VALIDATION_MSG.F_NAME_REQ),
  lastName: Yup.string().required(VALIDATION_MSG.L_NAME_REQ),
  email: Yup.string()
    .email(VALIDATION_MSG.EMAIL_INV)
    .required(VALIDATION_MSG.EMAIL_REQ),
  password: Yup.string().required(VALIDATION_MSG.PASS_REQ),
});

const SignUpForm: FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
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
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
