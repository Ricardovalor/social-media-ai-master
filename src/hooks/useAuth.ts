import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Simular autenticação
    setUser({ name: 'Usuário Demo' });
  }, []);

  return { user };
}
