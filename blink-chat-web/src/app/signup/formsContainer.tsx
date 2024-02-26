import { FC } from 'react';
import SignUpForm from '@/app/signup/signUpForm';

const FormsContainer: FC = () => {
  return (
    <div className="w-2/3 flex items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default FormsContainer;
