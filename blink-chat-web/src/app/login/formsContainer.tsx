import { FC } from 'react';
import LoginForm from '@/app/login/loginForm';

const FormsContainer: FC = () => {
  return (
    <div className="w-2/3 flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default FormsContainer;
