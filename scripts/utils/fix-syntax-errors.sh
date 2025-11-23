#!/bin/bash

echo "🔧 Corrigindo erros de sintaxe..."

# 1. Corrigir AnalyticsDashboard
cat > packages/analytics/src/components/AnalyticsDashboard.tsx << 'ANALYTICS_EOF'
import React, { useState } from 'react';

export const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const platformData = {
    tiktok: { followers: '45.2K', engagement: '12.5%', growth: '+15%', posts: 24 },
    instagram: { followers: '28.7K', engagement: '8.3%', growth: '+9%', posts: 18 },
    youtube: { followers: '15.3K', engagement: '24.1%', growth: '+22%', posts: 12 },
    twitter: { followers: '12.1K', engagement: '5.7%', growth: '+6%', posts: 32 }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📊 Analytics Avançado</h2>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm"
        >
          <option value="7d">Últimos 7 dias</option>
          <option value="30d">Últimos 30 dias</option>
          <option value="90d">Últimos 90 dias</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(platformData).map(([platform, data]) => (
          <div key={platform} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 capitalize">{platform}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{data.followers}</p>
                <p className="text-green-600 text-sm">↗ {data.growth}</p>
              </div>
              <div className="text-2xl">
                {platform === 'tiktok' && '🎵'}
                {platform === 'instagram' && '📸'}
                {platform === 'youtube' && '🎥'}
                {platform === 'twitter' && '🐦'}
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Engajamento: {data.engagement} • Posts: {data.posts}
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de Engajamento */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Tendência de Engajamento</h3>
        <div className="flex items-end justify-between h-32">
          {[65, 80, 60, 75, 85, 90, 95, 88, 92, 96, 98, 99].map((height, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-3 bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all duration-300 hover:from-green-600 hover:to-green-400"
                style={{ height: \`\${height}%\` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
ANALYTICS_EOF

echo "✅ AnalyticsDashboard corrigido"

# 2. Corrigir MonetizationDashboard
cat > packages/monetization/src/components/MonetizationDashboard.tsx << 'MONET_EOF'
import React from 'react';

export const MonetizationDashboard: React.FC = () => {
  const revenueStreams = [
    {
      id: 1,
      name: "Amazon Afiliados",
      platform: "TikTok",
      type: "affiliate",
      revenue: 3247,
      growth: 15,
      status: "active",
      icon: "💰"
    },
    {
      id: 2,
      name: "Google Adsense",
      platform: "YouTube",
      type: "ads",
      revenue: 1876,
      growth: 8,
      status: "active",
      icon: "📺"
    },
    {
      id: 3,
      name: "Sponsor Posts",
      platform: "Instagram",
      type: "sponsored",
      revenue: 5420,
      growth: 22,
      status: "active",
      icon: "💼"
    },
    {
      id: 4,
      name: "Digital Products",
      platform: "All",
      type: "product",
      revenue: 2890,
      growth: 45,
      status: "active",
      icon: "📚"
    }
  ];

  const totalRevenue = revenueStreams.reduce((sum, stream) => sum + stream.revenue, 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">💰 Dashboard de Monetização</h2>
        <div className="text-sm text-gray-500">Receita Total: <span className="font-bold text-green-600">R$ {totalRevenue.toLocaleString('pt-BR')}</span></div>
      </div>
      
      <div className="space-y-4">
        {revenueStreams.map((stream) => (
          <div key={stream.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white transition-colors">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{stream.icon}</span>
              <div>
                <p className="font-semibold text-gray-800">{stream.name}</p>
                <p className="text-sm text-gray-600">{stream.platform} • {stream.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">R$ {stream.revenue.toLocaleString('pt-BR')}</p>
              <p className="text-green-600 text-sm">↗ +{stream.growth}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de Distribuição */}
      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Distribuição de Receita</h3>
        <div className="flex items-end justify-between h-24">
          {revenueStreams.map((stream, index) => {
            const percentage = (stream.revenue / totalRevenue) * 100;
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
            
            return (
              <div key={stream.id} className="flex flex-col items-center">
                <div 
                  className={\`w-8 \${colors[index]} rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer\`}
                  style={{ height: \`\${percentage}%\` }}
                  title={\`\${stream.name}: R$ \${stream.revenue}\`}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{stream.name.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
MONET_EOF

echo "✅ MonetizationDashboard corrigido"

# 3. Corrigir useAIGenerator
cat > packages/ui/hooks/useAIGenerator.ts << 'HOOK_EOF'
import { useState } from 'react';

export interface AIGeneratorOptions {
  onContentGenerated?: (content: string) => void;
}

export const useAIGenerator = (options?: AIGeneratorOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent = async (prompt: string, platform?: string, tone?: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulação de IA - substituir por API real depois
      const response = await new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            const platformText = platform ? \` para \${platform}\` : '';
            const toneText = tone ? \` no tom \${tone}\` : '';
            resolve(\`🎯 CONTEÚDO GERADO\${platformText}\${toneText}:\n\n"\${prompt}"\n\n💡 Dicas para viralizar:\n• Use hashtags estratégicas\n• Poste nos horários de pico\n• Engaje com seus seguidores\n• Teste diferentes formatos\n\n🎊 BÔNUS: Interaja com os comentários para aumentar o alcance!\`);
          } else {
            reject(new Error('Falha temporária na geração. Tente novamente.'));
          }
        }, 2000);
      });
      
      setGeneratedContent(response);
      options?.onContentGenerated?.(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearContent = () => setGeneratedContent('');

  return {
    loading,
    error,
    generatedContent,
    generateContent,
    clearError,
    clearContent,
  };
};
HOOK_EOF

echo "✅ useAIGenerator corrigido"

# 4. Corrigir API route
cat > src/app/api/ai/generate/route.ts << 'API_EOF'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, tone } = await request.json();

    // Simulação de IA - substituir por integração real com OpenAI, etc.
    const generatedContent = \`🎯 CONTEÚDO GERADO para \${platform} no tom \${tone}:\n\n"\${prompt}"\n\n💡 Dicas para viralizar:\n• Use hashtags estratégicas\n• Poste nos horários de pico\n• Engaje com seus seguidores\n• Teste diferentes formatos\`;

    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha temporária na geração. Tente novamente.' },
      { status: 500 }
    );
  }
}
API_EOF

echo "✅ API route corrigida"

echo "🎉 Correções de sintaxe aplicadas!"
