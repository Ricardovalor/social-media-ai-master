'use client';

import { MessageCircle } from 'lucide-react';

// Componente temporário para substituir o problemático
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

export const navigationItems = [
  { icon: MessageCircle, label: "Chat IA", path: "/ai-chat" }
];
