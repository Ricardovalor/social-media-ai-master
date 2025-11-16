import React, { useState } from 'react';
import { StatsGrid } from './components/dashboard/StatsGrid';
import { RecentPosts } from './components/dashboard/RecentPosts';
import { SchedulePost } from './components/dashboard/SchedulePost';
import { AnalyticsChart } from './components/analytics/AnalyticsChart';
import { AIGenerator } from './components/ai/AIGenerator';
import { User, SocialStats, Post } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'ai-generator' | 'scheduling' | 'settings'>('dashboard');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: '🚀 Lançando nossa nova plataforma de Social Media AI! Revolucionando a gestão de mídias sociais com inteligência artificial',
      platform: 'twitter',
      schedule: new Date(),
      status: 'published',
      engagement: { likes: 42, shares: 12, comments: 8, clicks: 56 }
    },
    {
      id: '2',
      content: '📸 Confira as novas funcionalidades da nossa plataforma em ação! Visualizações incríveis e analytics em tempo real',
      platform: 'instagram',
      schedule: new Date(Date.now() + 86400000),
      status: 'scheduled'
    },
    {
      id: '3',
      content: '💼 Dicas essenciais para melhorar sua estratégia de LinkedIn e gerar mais conexões profissionais',
      platform: 'linkedin',
      schedule: new Date(Date.now() - 86400000),
      status: 'published',
      engagement: { likes: 28, shares: 5, comments: 12, clicks: 34 }
    }
  ]);

  const [stats] = useState<SocialStats>({
    followers: 12543,
    engagement: 4.2,
    reach: 48752,
    impressions: 123456,
    growth: 12
  });

  const [user] = useState<User>({
    id: '1',
    name: 'Ricardo Silva',
    email: 'ricardo@empresa.com',
    plan: 'pro'
  });

  const navigation = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
    { id: 'ai-generator', label: '🤖 IA Generator', icon: '🤖' },
    { id: 'scheduling', label: '📅 Agendamento', icon: '📅' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
  ] as const;

  const handleNewPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setActiveTab('dashboard'); // Volta para o dashboard após agendar
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Social Media AI Master</h1>
                <p className="text-sm text-gray-600">Plataforma Inteligente de Gestão de Mídias Sociais</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mt-1">
                  {user.plan.toUpperCase()}
                </span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-8 overflow-x-auto">
            {navigation.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 py-4 px-2 sm:px-1 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">🎉 Bem-vindo de volta, {user.name}!</h2>
                  <p className="text-blue-100 text-lg">Sua plataforma está funcionando perfeitamente. Aqui está o resumo do seu desempenho.</p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <div className="text-4xl">🚀</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-6">⚡ Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('ai-generator')}
                  className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-all duration-200 group hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <span className="font-semibold text-blue-800">Gerar Conteúdo com IA</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium group-hover:bg-blue-200 transition-colors">→</span>
                </button>

                <button
                  onClick={() => setActiveTab('scheduling')}
                  className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-all duration-200 group hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <span className="font-semibold text-green-800">Agendar Posts</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium group-hover:bg-green-200 transition-colors">+</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100 transition-all duration-200 group hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📈</span>
                    <span className="font-semibold text-purple-800">Ver Analytics</span>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium group-hover:bg-purple-200 transition-colors">→</span>
                </button>

                <button
                  className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:bg-orange-100 transition-all duration-200 group hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👥</span>
                    <span className="font-semibold text-orange-800">Gerenciar Equipe</span>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium group-hover:bg-orange-200 transition-colors">→</span>
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <RecentPosts posts={posts} />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsChart />
        )}

        {/* AI Generator Tab */}
        {activeTab === 'ai-generator' && (
          <AIGenerator />
        )}

        {/* Scheduling Tab */}
        {activeTab === 'scheduling' && (
          <SchedulePost onPostScheduled={handleNewPost} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-6">⚙️ Configurações</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plano Atual</label>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800">Plano {user.plan.toUpperCase()}</p>
                    <p className="text-sm text-blue-600 mt-1">Gerencie sua assinatura</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notificações</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Alertas de desempenho</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Posts agendados</span>
                    </label>
                  </div>
                </div>
              </div>

              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                💾 Salvar Configurações
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-gray-600 font-semibold">Social Media AI Master Platform v5.0</p>
              <p className="text-gray-500 text-sm">Sistema profissional de gestão de mídias sociais</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-sm">Desenvolvido com</p>
              <div className="flex space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">React</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">TypeScript</span>
                <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs font-bold">Tailwind</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Vite</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
