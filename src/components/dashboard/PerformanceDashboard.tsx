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
