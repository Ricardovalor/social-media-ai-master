import React, { useState } from 'react';
import { useAIGenerator } from '../../hooks/useAIGenerator';

export const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState<'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'tiktok'>('twitter');
  const [tone, setTone] = useState<'professional' | 'casual' | 'funny' | 'inspirational'>('professional');
  const [generatedContent, setGeneratedContent] = useState('');

  const { generateContent, loading, error, clearError } = useAIGenerator({
    onContentGenerated: setGeneratedContent
  });

  const handleGenerate = () => {
    clearError();
    generateContent(prompt, platform, tone);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
      <h3 className="text-xl font-bold text-gray-900 mb-6">🤖 Gerador de Conteúdo com IA</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🌐 Plataforma</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as any)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🎭 Tom do Conteúdo</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="professional">Profissional</option>
              <option value="casual">Casual</option>
              <option value="funny">Humorístico</option>
              <option value="inspirational">Inspiracional</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Gerando...
              </span>
            ) : (
              '🎯 Gerar Conteúdo'
            )}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">💡 Sua Ideia ou Tópico</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Lançamento do novo produto de tecnologia com foco em sustentabilidade..."
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📄 Conteúdo Gerado</label>
            <div className="min-h-[200px] p-4 border border-gray-300 rounded-lg bg-gray-50 whitespace-pre-wrap transition-colors">
              {generatedContent || '✨ Seu conteúdo aparecerá aqui...\n\n💡 Dica: Descreva bem sua ideia para obter o melhor resultado!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
