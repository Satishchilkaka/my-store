import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  logout: () => void;
}

interface ChildrenAuthContextType { 
  children?: React.ReactNode;

}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC <ChildrenAuthContextType> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); 
    console.log('after logout', token);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const authContextValue: AuthContextType = {
    token,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
