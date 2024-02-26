import { Metadata } from 'next';
import AuthLayout from '@/components/common/AuthLayout';
import SignUpForm from '@/app/signup/signUpForm';

export const metadata: Metadata = {
  title: 'SignUp - Edu Grade',
  description: 'Edu grade login page',
};

const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
