const fs = require('fs');
const path = require('path');

// Função para escrever arquivos
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
  console.log(\`✅ \${filePath} criado\`);
}

// SocialTokens.tsx
const socialTokensContent = `'use client';

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
`;

// PredictiveAnalytics.tsx
const predictiveAnalyticsContent = `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, Target } from 'lucide-react';

export function PredictiveAnalytics() {
  const predictions = [
    { metric: 'Crescimento Seguidores', current: 12457, predicted: 18742, confidence: 94 },
    { metric: 'Taxa Engajamento', current: 8.7, predicted: 12.3, confidence: 87 },
    { metric: 'Receita Mensal', current: 3245, predicted: 8420, confidence: 82 },
    { metric: 'Visualizações/Vídeo', current: 8432, predicted: 15200, confidence: 89 }
  ];

  const optimalTimes = [
    { platform: 'TikTok', time: '19:00-21:00', engagement: 47 },
    { platform: 'Instagram', time: '17:00-19:00', engagement: 42 },
    { platform: 'YouTube', time: '20:00-22:00', engagement: 38 },
    { platform: 'Twitter', time: '08:00-10:00', engagement: 35 }
  ];

  const getConfidenceClass = (confidence) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 80) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Previsões de Crescimento
          </CardTitle>
          <CardDescription>
            Projeções baseadas em machine learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((pred, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{pred.metric}</span>
                  <span className={\`px-2 py-1 rounded-full text-xs \${getConfidenceClass(pred.confidence)}\`}>
                    {pred.confidence}% confiança
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Atual: {typeof pred.current === 'number' ? pred.current.toLocaleString() : pred.current}</span>
                  <span className="font-bold text-green-600">
                    → {typeof pred.predicted === 'number' ? pred.predicted.toLocaleString() : pred.predicted}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: \`\${Math.min(100, (pred.current / pred.predicted) * 100)}%\` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Horários Otimizados Preditivos
          </CardTitle>
          <CardDescription>
            Melhores horários baseados em IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimalTimes.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium">{time.platform}</p>
                    <p className="text-sm text-gray-600">{time.time}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600">+{time.engagement}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

// AdvancedMonetization.tsx
const advancedMonetizationContent = `'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Zap } from 'lucide-react';

export function AdvancedMonetization() {
  const revenueStreams = [
    { source: 'AdSense & Anúncios', amount: 3245, growth: 15, platform: 'Multi' },
    { source: 'Afiliados Avançados', amount: 5420, growth: 42, platform: 'TikTok Shop' },
    { source: 'NFTs Sociais', amount: 2100, growth: 187, platform: 'Web3' },
    { source: 'Tokens de Conteúdo', amount: 1850, growth: 95, platform: 'Blockchain' },
    { source: 'Metaverse Experiences', amount: 3200, growth: 210, platform: 'Metaverso' },
    { source: 'Consultoria IA', amount: 4500, growth: 65, platform: 'Premium' }
  ];

  const smartAutomations = [
    { name: 'Bot de Vendas IA', roi: 320, status: 'active' },
    { name: 'Agendamento Inteligente', roi: 185, status: 'active' },
    { name: 'Análise Preditiva', roi: 275, status: 'active' },
    { name: 'Geração de Conteúdo IA', roi: 420, status: 'active' }
  ];

  const getGrowthColor = (growth) => {
    if (growth > 100) return { bg: 'bg-green-100', text: 'text-green-600' };
    if (growth > 50) return { bg: 'bg-blue-100', text: 'text-blue-600' };
    return { bg: 'bg-yellow-100', text: 'text-yellow-600' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Fluxos de Receita Inteligentes
          </CardTitle>
          <CardDescription>
            Múltiplas fontes de renda automatizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueStreams.map((stream, index) => {
              const colors = getGrowthColor(stream.growth);
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={\`p-2 rounded-full \${colors.bg}\`}>
                      <DollarSign className={\`w-4 h-4 \${colors.text}\`} />
                    </div>
                    <div>
                      <p className="font-semibold">{stream.source}</p>
                      <p className="text-sm text-gray-600">{stream.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {stream.amount.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+{stream.growth}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Automações com Melhor ROI
          </CardTitle>
          <CardDescription>
            Sistemas que geram retorno automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smartAutomations.map((auto, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="font-semibold">{auto.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ROI</span>
                  <span className="font-bold text-green-600">+{auto.roi}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`;

// MultimodalGenerator.tsx
const multimodalGeneratorContent = `'use client';

import { useState } from 'react';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Video, Image, FileText, Music } from 'lucide-react';

export function MultimodalGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState([]);

  const contentTypes = [
    { type: 'video', icon: Video, label: 'Vídeo Short', time: '30s', cost: 2 },
    { type: 'image', icon: Image, label: 'Imagem IA', time: '10s', cost: 1 },
    { type: 'script', icon: FileText, label: 'Roteiro', time: '15s', cost: 0.5 },
    { type: 'audio', icon: Music, label: 'Áudio/Narração', time: '20s', cost: 1.5 }
  ];

  const generateContent = (type) => {
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
            ? { ...item, status: 'completed', url: \`/\${type}-\${Date.now()}\` }
            : item
        )
      );
    }, 2000);
  };

  const getStatusClass = (status) => {
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
                      <span className={\`text-xs px-2 py-1 rounded-full \${getStatusClass(content.status)}\`}>
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
`;

// Escrever os arquivos
writeFile('src/components/web3/SocialTokens.tsx', socialTokensContent);
writeFile('src/components/analytics/PredictiveAnalytics.tsx', predictiveAnalyticsContent);
writeFile('src/components/monetization/AdvancedMonetization.tsx', advancedMonetizationContent);
writeFile('src/components/ai/MultimodalGenerator.tsx', multimodalGeneratorContent);

console.log('🎉 Todos os componentes foram criados!');
