#!/bin/bash

echo "🚀 Corrigindo todos os componentes truncados..."

# 1. MultimodalGenerator.tsx
cat > src/components/ai/MultimodalGenerator.tsx << 'COMPONENT_EOF'
'use client';

import { useState } from 'react';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Video, Image, FileText, Music } from 'lucide-react';

export function MultimodalGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);

  const contentTypes = [
    { type: 'video', icon: Video, label: 'Vídeo Short', time: '30s', cost: 2 },
    { type: 'image', icon: Image, label: 'Imagem IA', time: '10s', cost: 1 },
    { type: 'script', icon: FileText, label: 'Roteiro', time: '15s', cost: 0.5 },
    { type: 'audio', icon: Music, label: 'Áudio/Narração', time: '20s', cost: 1.5 }
  ];

  const generateContent = (type: string) => {
    const newContent = {
      id: Date.now(),
      type,
      prompt,
      timestamp: new Date(),
      status: 'generating'
    };
    
    setGeneratedContent(prev => [newContent, ...prev]);
    
    setTimeout(() => {
      setGeneratedContent(prev => 
        prev.map(item => 
          item.id === newContent.id 
            ? { ...item, status: 'completed', url: '/' + type + '-' + Date.now() }
            : item
        )
      );
    }, 2000);
  };

  const getStatusClass = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerador de Conteúdo Multimodal</CardTitle>
          <CardDescription>
            Crie vídeos, imagens, áudio e textos com IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Descreva o conteúdo que deseja criar..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-24"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contentTypes.map((contentType) => (
              <Button
                key={contentType.type}
                variant="outline"
                className="flex flex-col h-20 gap-2"
                onClick={() => generateContent(contentType.type)}
                disabled={!prompt.trim()}
              >
                <contentType.icon className="w-5 h-5" />
                <span className="text-xs">{contentType.label}</span>
                <span className="text-xs text-gray-500">{contentType.time}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {generatedContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Gerado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedContent.map((content) => {
                const contentType = contentTypes.find(ct => ct.type === content.type);
                return (
                  <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {contentType?.icon && React.createElement(contentType.icon, { className: "w-4 h-4" })}
                      <div>
                        <p className="font-medium">{contentType?.label}</p>
                        <p className="text-sm text-gray-600">{content.prompt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={'text-xs px-2 py-1 rounded-full ' + getStatusClass(content.status)}>
                        {content.status === 'completed' ? 'Pronto' : 'Gerando...'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {content.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
COMPONENT_EOF

echo "✅ MultimodalGenerator.tsx corrigido"

# 2. SocialTokens.tsx
cat > src/components/web3/SocialTokens.tsx << 'COMPONENT_EOF'
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Users, TrendingUp, Zap } from 'lucide-react';

export function SocialTokens() {
  const [tokens, setTokens] = useState({
    socialToken: 1250,
    engagementPoints: 8420,
    nftBadges: 3,
    metaverseLand: 1
  });

  const tokenEconomy = [
    { action: 'Post Viral', reward: 50, type: 'token' },
    { action: '1000 Seguidores', reward: 100, type: 'token' },
    { action: '10K Visualizações', reward: 200, type: 'token' },
    { action: 'Primeiro NFT', reward: 1, type: 'nft' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            Economia de Tokens Sociais
          </CardTitle>
          <CardDescription>
            Ganhe tokens e NFTs pelo seu engajamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <Coins className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{tokens.socialToken}</p>
              <p className="text-sm text-gray-600">Tokens</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{tokens.engagementPoints}</p>
              <p className="text-sm text-gray-600">Pontos</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{tokens.nftBadges}</p>
              <p className="text-sm text-gray-600">NFTs</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{tokens.metaverseLand}</p>
              <p className="text-sm text-gray-600">Terrenos</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Como Ganhar Tokens:</h4>
            {tokenEconomy.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <span>{item.action}</span>
                <span className="font-bold text-green-600">+{item.reward} {item.type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
COMPONENT_EOF

echo "✅ SocialTokens.tsx corrigido"

# 3. RealTimeAnalytics.tsx
cat > src/components/analytics/RealTimeAnalytics.tsx << 'COMPONENT_EOF'
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, Share2, Heart, MessageCircle } from 'lucide-react';

export function RealTimeAnalytics() {
  const realTimeStats = [
    { metric: 'Visualizações', value: 12457, icon: Eye, change: 12 },
    { metric: 'Compartilhamentos', value: 842, icon: Share2, change: 8 },
    { metric: 'Curtidas', value: 5420, icon: Heart, change: 15 },
    { metric: 'Comentários', value: 1245, icon: MessageCircle, change: 5 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Analytics em Tempo Real
        </CardTitle>
        <CardDescription>
          Acompanhe o desempenho do seu conteúdo em tempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {realTimeStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-4 border rounded-lg">
              <stat.icon className="w-8 h-8 mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{stat.metric}</p>
              <p className="text-xs text-green-600 mt-1">+{stat.change}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
COMPONENT_EOF

echo "✅ RealTimeAnalytics.tsx corrigido"

# 4. ThemeContext.tsx
cat > src/contexts/ThemeContext.tsx << 'COMPONENT_EOF'
'use client';

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
COMPONENT_EOF

echo "✅ ThemeContext.tsx corrigido"

# 5. Navigation.tsx
cat > src/components/layout/Navigation.tsx << 'COMPONENT_EOF'
'use client';

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
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
COMPONENT_EOF

echo "✅ Navigation.tsx corrigido"

# 6. PerformanceDashboard.tsx
cat > src/components/dashboard/PerformanceDashboard.tsx << 'COMPONENT_EOF'
'use client';

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
COMPONENT_EOF

echo "✅ PerformanceDashboard.tsx corrigido"

# 7. Layout.tsx
cat > src/app/layout.tsx << 'COMPONENT_EOF'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navigation } from '@/components/layout/Navigation';

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
    <html lang="pt-BR">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
COMPONENT_EOF

echo "✅ Layout.tsx corrigido"

# 8. AuthProvider.tsx
cat > src/components/auth/AuthProvider.tsx << 'COMPONENT_EOF'
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
COMPONENT_EOF

echo "✅ AuthProvider.tsx corrigido"

echo ""
echo "🎉 TODOS OS COMPONENTES FORAM CORRIGIDOS COM SUCESSO!"
echo ""
