// context/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticated: (auth: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verifica se o cookie de autenticação existe no carregamento
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/login"); 
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        setAuthenticated: setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return context;
};
