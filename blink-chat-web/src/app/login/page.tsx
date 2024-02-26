import { Metadata } from 'next';
import AuthLayout from '@/components/common/AuthLayout';
import LoginForm from '@/app/login/loginForm';

export const metadata: Metadata = {
  title: 'Login - Edu Grade',
  description: 'Edu grade login page',
};

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
