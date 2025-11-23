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
