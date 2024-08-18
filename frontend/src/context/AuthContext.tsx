import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '../api/axios'; 

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser('authenticated');
    }
  }, []); // This runs only once when the component mounts

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/token/', { username, password });
      localStorage.setItem('token', response.data.access);
      setUser(username);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
