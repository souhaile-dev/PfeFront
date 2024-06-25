// src/routes/components/Lo/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setCurrentUser(user);
          setRole(userDoc.data().role);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  const setUserData = (userData) => {
    setCurrentUser(userData.user);
    setRole(userData.role);
  };

  const value = {
    currentUser,
    role,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
