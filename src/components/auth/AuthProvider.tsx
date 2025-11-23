// Sistema de autenticação baseado nas ideias trazidas
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de autenticação
    const checkAuth = async () => {
      setIsLoading(true);
      // Aqui você implementaria a verificação real
      setTimeout(() => {
        setUser({
          id: '1',
          name: 'Usuário Demo',
          email: 'demo@example.com'
        });
        setIsLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simular login
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Usuário Demo',
        email: email
      });
      setIsLoading(false);
    }, 1500);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
