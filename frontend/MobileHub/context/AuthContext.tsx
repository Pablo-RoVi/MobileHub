// File: AuthContext.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of the user object
export interface User {
    token: string;
  email: string;
  birthYear: number;
  rut: string;
  fullName: string;
}

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a helper function to throw an error if the context is used outside a provider
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Define a provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to set the logged-in user
  const login = (userData: User) => {
    setUser(userData);
  };

  // Function to clear the user (logout)
  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Define a hook to easily use the context in components
export const useAuth = () => useAuthContext();
