import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
