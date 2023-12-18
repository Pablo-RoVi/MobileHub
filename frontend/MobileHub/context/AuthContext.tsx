// File: AuthContext.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react';

/**
 * The User interface defines the shape of the user object
 * @param token The user token
 * @param email The user email
 * @param birthYear The user birth year
 * @param rut The user rut
 * @param fullName The user full name
 * @returns The User object
 */
export interface User {
    token: string;
  email: string;
  birthYear: number;
  rut: string;
  fullName: string;
}

/**
 * The AuthContextType interface defines the shape of the context object
 * @param user The user object
 * @param login The function to set the logged-in user
 * @param logout The function to clear the user (logout)
 * @returns The AuthContextType object
 */
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

/**
 * The AuthProviderProps interface defines the props for the AuthProvider component
 * @param children The children of the component
 * @returns The AuthProvider children component
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * The AuthProvider component provides the user object and functions to login and logout
 * @param param0 The children of the component
 * @returns The AuthProvider component
 */
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

  // Define the context value
  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  // Return the provider component
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Define a hook to easily use the context in components
export const useAuth = () => useAuthContext();
