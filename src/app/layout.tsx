import type { Metadata } from 'next';
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
