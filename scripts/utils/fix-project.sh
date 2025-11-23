#!/bin/bash

echo "🔧 CORRIGINDO PROJETO SOCIAL MEDIA AI MASTER..."

# Voltar para o diretório do projeto
cd /c/Users/ricar

# Criar estrutura de diretórios necessária
mkdir -p src/components/dashboard src/components/analytics src/components/ai src/contexts src/store src/services src/hooks src/types public

# 1. Corrigir package.json
cat > package.json << 'PKGEOF'
{
  "name": "social-media-ai-master",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "vite --host",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["social-media", "ai", "react", "typescript"],
  "author": "Ricardo Silva",
  "license": "MIT",
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@types/react-router-dom": "^5.3.3",
    "axios": "^1.13.2",
    "cors": "^2.8.5",
    "crypto-js": "^4.2.0",
    "date-fns": "^4.1.0",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "framer-motion": "^12.23.24",
    "idb": "^8.0.3",
    "lucide-react": "^0.553.0",
    "mongoose": "^8.19.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.66.0",
    "react-router-dom": "^6.8.1",
    "recharts": "^3.4.1",
    "zod": "^4.1.12",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.22",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.0",
    "vite": "^4.5.0"
  }
}
PKGEOF

# 2. Configuração do Vite
cat > vite.config.js << 'VITEEOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
VITEEOF

# 3. Index.html
cat > index.html << 'HTMLEOF'
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Social Media AI Master - Plataforma Inteligente</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTMLEOF

# 4. Arquivo principal React
cat > src/main.tsx << 'MAINEOF'
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ThemeProvider } from "./contexts/ThemeContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
MAINEOF

# 5. App.tsx básico
cat > src/App.tsx << 'APPEOF'
import React from 'react';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🚀 Social Media AI Master
          </h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>
        
        <main>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Bem-vindo à Plataforma
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sistema de gestão de mídias sociais com IA. Em desenvolvimento...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder para componentes */}
            {['StatsGrid', 'RecentPosts', 'AnalyticsChart', 'AIGenerator', 'PostScheduler'].map((component) => (
              <div key={component} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {component}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Componente será implementado em breve
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
APPEOF

# 6. CSS com Tailwind
cat > src/index.css << 'CSSEOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos personalizados */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Dark mode styles */
.dark {
  background-color: #111827;
  color: white;
}

.dark .bg-white {
  background-color: #1f2937;
}

.dark .text-gray-900 {
  color: #f9fafb;
}

.dark .text-gray-700 {
  color: #d1d5db;
}

.dark .text-gray-600 {
  color: #9ca3af;
}

.dark .border-gray-200 {
  border-color: #374151;
}

.dark .bg-gray-50 {
  background-color: #374151;
}
CSSEOF

# 7. Theme Context
cat > src/contexts/ThemeContext.tsx << 'THEMEEOF'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
THEMEEOF

# 8. Store principal
cat > src/store/useAppStore.ts << 'STOREEOF'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  avatar?: string;
}

interface Post {
  id: string;
  content: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'tiktok';
  schedule: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}

interface AppState {
  user: User;
  posts: Post[];
  setUser: (user: User) => void;
  addPost: (post: Omit<Post, 'id'>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        id: '1',
        name: 'Ricardo Silva',
        email: 'ricardo@empresa.com',
        plan: 'pro',
        avatar: ''
      },
      posts: [
        {
          id: '1',
          content: '🚀 Lançando nossa nova plataforma de Social Media AI!',
          platform: 'twitter',
          schedule: new Date(),
          status: 'published',
          engagement: { likes: 42, shares: 12, comments: 8, clicks: 56 }
        }
      ],
      setUser: (user) => set({ user }),
      addPost: (newPost) => set((state) => {
        const post: Post = {
          ...newPost,
          id: Date.now().toString()
        };
        return { posts: [post, ...state.posts] };
      }),
    }),
    {
      name: 'social-media-ai-store'
    }
  )
);
STOREEOF

# 9. Configuração do Tailwind
cat > tailwind.config.js << 'TAILEOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
TAILEOF

cat > postcss.config.js << 'POSTEOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
POSTEOF

echo "✅ Estrutura do projeto criada com sucesso!"
echo "📦 Instalando dependências..."

# Instalar dependências
npm install

echo "🎉 PROJETO CORRIGIDO!"
echo "🚀 Execute: npm run dev"
