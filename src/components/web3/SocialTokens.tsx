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
