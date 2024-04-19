import React, { useState, createContext, ReactNode, useEffect } from 'react';
import axios from 'axios'; // Or use fetch

interface User {
  email: string;
  password: string;
  [key: string]: any;
}

interface AuthContextProps {
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<string | null>(localStorage.getItem('auth') || null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('http://24.133.52.46:8000/api/me/', {
        headers: { Authorization: `Token ${auth}` },
      });
      setUser(response.data);
    };

    if (auth) {
      fetchUserData();
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', auth);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  const value = { auth, setAuth, user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};