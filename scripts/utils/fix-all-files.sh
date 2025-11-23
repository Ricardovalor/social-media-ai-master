#!/bin/bash

# Corrigir SocialTokens.tsx
cat > src/components/web3/SocialTokens.tsx << 'SOCIAL'
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
SOCIAL

# Corrigir PredictiveAnalytics.tsx
cat > src/components/analytics/PredictiveAnalytics.tsx << 'PREDICTIVE'
'use client';

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

  const getConfidenceClass = (confidence: number) => {
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
PREDICTIVE

# ... (similar para os outros arquivos)

