import React from 'react';
import { AuthProvider } from './AuthContext';
import App from '../App';

const AuthProviderWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AuthProviderWrapper;