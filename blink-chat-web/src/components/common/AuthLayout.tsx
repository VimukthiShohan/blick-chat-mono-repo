import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen flex bg-gray-50">
    <div className="w-2/3 flex items-center justify-center">{children}</div>
    <div className="w-1/3 bg-blue-700"></div>
  </div>
);

export default AuthLayout;
