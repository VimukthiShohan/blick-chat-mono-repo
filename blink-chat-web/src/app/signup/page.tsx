import { Metadata } from 'next';
import SignUpForm from '@/app/signup/signUpForm';
import AuthLayout from '@/components/common/AuthLayout';

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
