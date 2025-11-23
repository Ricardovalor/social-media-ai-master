'use client';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  // Por enquanto, retorna children diretamente
  // Futuramente implementar lógica de autenticação
  return <>{children}</>;
}
