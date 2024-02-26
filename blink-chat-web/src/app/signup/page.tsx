import { Metadata } from 'next';
import FormsContainer from './formsContainer';

export const metadata: Metadata = {
  title: 'Login - Edu Grade',
  description: 'Edu grade login page',
};

const Login = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <FormsContainer />
      <div className="w-1/3 bg-blue-700"></div>
    </div>
  );
};

export default Login;
