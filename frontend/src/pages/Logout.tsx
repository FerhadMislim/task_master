import React from 'react';
import { useAuth } from '../context/AuthContext';

const Logout: React.FC = () => {
  const { logout } = useAuth();

  React.useEffect(() => {
    logout();
  }, [logout]);

  return <h2>You have been logged out.</h2>;
};

export default Logout;
