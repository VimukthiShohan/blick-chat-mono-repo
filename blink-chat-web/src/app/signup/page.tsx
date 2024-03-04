import { Metadata } from 'next';

import SignUpForm from '@/app/signup/signUpForm';
import AuthLayout from '@/components/common/AuthLayout';

export const metadata: Metadata = { title: 'Signup' };

const SignUpPage = () => (
  <AuthLayout>
    <SignUpForm />
  </AuthLayout>
);

export default SignUpPage;
