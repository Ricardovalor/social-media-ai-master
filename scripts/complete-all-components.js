const fs = require('fs');
const path = require('path');

console.log('🚀 Completando todos os componentes truncados...');

// 1. Completar ThemeContext.tsx
fs.writeFileSync(
  'src/contexts/ThemeContext.tsx',
`'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  switchable = false
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (switchable) {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
`
);
console.log('✅ ThemeContext.tsx completado');

// 2. Completar AuthProvider.tsx
fs.writeFileSync(
  'src/components/auth/AuthProvider.tsx',
`// Sistema de autenticação baseado nas ideias trazidas
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
`
);
console.log('✅ AuthProvider.tsx completado');

// 3. Completar Layout.tsx
fs.writeFileSync(
  'src/app/layout.tsx',
`import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navigation } from '@/components/layout/Navigation';
import { AuthProvider } from '@/components/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Media AI Master Platform',
  description: 'Plataforma completa de gerenciamento de mídias sociais com IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider switchable>
            <div className="flex min-h-screen">
              {/* Sidebar */}
              <div className="w-64 bg-white border-r border-gray-200 p-6">
                <div className="mb-8">
                  <h1 className="text-xl font-bold text-gray-900">
                    Social AI Master
                  </h1>
                  <p className="text-sm text-gray-600">Plataforma Completa</p>
                </div>
                <Navigation />
              </div>
              
              {/* Main Content */}
              <div className="flex-1 bg-gray-50">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
`
);
console.log('✅ Layout.tsx completado');

// 4. Completar Navigation.tsx
fs.writeFileSync(
  'src/components/layout/Navigation.tsx',
`'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart3,
  DollarSign,
  Bot,
  Zap,
  Coins,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Monetização', href: '/advanced-monetization', icon: DollarSign },
  { name: 'IA Multimodal', href: '/multimodal-generator', icon: Bot },
  { name: 'Automação', href: '/automation', icon: Zap },
  { name: 'Web3 Dashboard', href: '/web3-dashboard', icon: Coins },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={\`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors \${
              isActive
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            }\`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
`
);
console.log('✅ Navigation.tsx completado');

// 5. Completar PerformanceDashboard.tsx
fs.writeFileSync(
  'src/components/dashboard/PerformanceDashboard.tsx',
`'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Eye, DollarSign, Share2, Heart } from 'lucide-react';

export function PerformanceDashboard() {
  const platformStats = [
    {
      platform: 'TikTok',
      followers: '125.4K',
      growth: '+12.5%',
      engagement: '8.7%',
      views: '2.4M'
    },
    {
      platform: 'Instagram',
      followers: '89.2K',
      growth: '+8.3%',
      engagement: '6.2%',
      views: '1.8M'
    },
    {
      platform: 'YouTube',
      followers: '45.7K',
      growth: '+15.1%',
      engagement: '12.3%',
      views: '3.2M'
    },
    {
      platform: 'Twitter',
      followers: '32.1K',
      growth: '+5.7%',
      engagement: '4.8%',
      views: '890K'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">292.4K</p>
                <p className="text-sm text-gray-600">Seguidores Totais</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8.3M</p>
                <p className="text-sm text-gray-600">Visualizações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">7.8%</p>
                <p className="text-sm text-gray-600">Engajamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 12.4K</p>
                <p className="text-sm text-gray-600">Receita Mensal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plataformas */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Plataforma</CardTitle>
          <CardDescription>
            Desempenho detalhado em cada rede social
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((platform, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">{platform.platform}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Seguidores:</span>
                    <span className="font-medium">{platform.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Crescimento:</span>
                    <span className="font-medium text-green-600">{platform.growth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Engajamento:</span>
                    <span className="font-medium">{platform.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Visualizações:</span>
                    <span className="font-medium">{platform.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`
);
console.log('✅ PerformanceDashboard.tsx completado');

// 6. Completar página principal
fs.writeFileSync(
  'src/app/page.tsx',
`import { PerformanceDashboard } from '@/components/dashboard/PerformanceDashboard';

export default function Home() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Principal
        </h1>
        <p className="text-gray-600">
          Visão geral do desempenho das suas redes sociais
        </p>
      </div>

      <PerformanceDashboard />
    </div>
  );
}
`
);
console.log('✅ Página principal completada');

console.log('🎉 TODOS OS COMPONENTES FORAM COMPLETADOS COM SUCESSO!');
