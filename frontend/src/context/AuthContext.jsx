import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerkAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (clerkUser) {
        setUser({
            _id: clerkUser.id,
            clerkId: clerkUser.id,
            name: clerkUser.fullName || clerkUser.username,
            email: clerkUser.primaryEmailAddress?.emailAddress,
            role: clerkUser.publicMetadata?.role || 'customer',
            imageUrl: clerkUser.imageUrl
        });
    } else {
        setUser(null);
    }
  }, [clerkUser]);

  const logout = () => {
    signOut();
    setUser(null);
  };

  // Deprecated/No-op functions for compatibility if needed during migration
  const login = async () => { console.warn('Login is handled by Clerk UI'); };
  const register = async () => { console.warn('Register is handled by Clerk UI'); };

  return (
    <AuthContext.Provider value={{ user, loading: !isLoaded, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
