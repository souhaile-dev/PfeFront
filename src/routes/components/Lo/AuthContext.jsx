import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ currentUser: null, role: null });

  const setUserData = ({ email, role, token }) => {
    setAuthData({ currentUser: { email, token }, role });
  };

  return (
    <AuthContext.Provider value={{ ...authData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
