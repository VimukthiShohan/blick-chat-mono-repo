import { Metadata } from 'next';
import LoginForm from '@/app/login/loginForm';
import AuthLayout from '@/components/common/AuthLayout';

export const metadata: Metadata = {
  title: 'Login - Edu Grade',
  description: 'Edu grade login page',
};

const LoginPage = () => (
  <AuthLayout>
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;
