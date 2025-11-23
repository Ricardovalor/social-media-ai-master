'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Eye, Share2, Heart, MessageCircle } from 'lucide-react';

export function RealTimeDashboard() {
  const [metrics, setMetrics] = useState({
    views: 12457,
    engagement: 8.7,
    followers: 8432,
    shares: 324,
    likes: 2156,
    comments: 187
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        views: prev.views + Math.floor(Math.random() * 10),
        engagement: Math.min(10, prev.engagement + (Math.random() * 0.1 - 0.05)),
        followers: prev.followers + Math.floor(Math.random() * 3),
        shares: prev.shares + Math.floor(Math.random() * 2),
        likes: prev.likes + Math.floor(Math.random() * 5),
        comments: prev.comments + Math.floor(Math.random() * 1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    { icon: Eye, label: 'Visualizações', value: metrics.views.toLocaleString(), color: 'text-blue-500' },
    { icon: TrendingUp, label: 'Engajamento', value: `${metrics.engagement.toFixed(1)}%`, color: 'text-green-500' },
    { icon: Users, label: 'Seguidores', value: metrics.followers.toLocaleString(), color: 'text-purple-500' },
    { icon: Share2, label: 'Compartilhamentos', value: metrics.shares.toLocaleString(), color: 'text-orange-500' },
    { icon: Heart, label: 'Curtidas', value: metrics.likes.toLocaleString(), color: 'text-red-500' },
    { icon: MessageCircle, label: 'Comentários', value: metrics.comments.toLocaleString(), color: 'text-yellow-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricCards.map((metric) => (
          <Card key={metric.label} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-opacity-10 ${metric.color.replace('text-', 'bg-')}`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance por Plataforma</CardTitle>
            <CardDescription>Engajamento nas últimas 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { platform: 'TikTok', engagement: 12.4, growth: '+5.2%' },
                { platform: 'Instagram', engagement: 8.7, growth: '+2.1%' },
                { platform: 'YouTube', engagement: 6.3, growth: '+1.8%' },
                { platform: 'Twitter', engagement: 3.2, growth: '+0.7%' }
              ].map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between">
                  <span className="font-medium">{platform.platform}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{platform.engagement}%</span>
                    <span className="text-sm text-green-500">{platform.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo em Alta</CardTitle>
            <CardDescription>Posts com maior engajamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Como viralizar no TikTok', engagement: '15.2K', platform: 'TikTok' },
                { title: '5 dicas de marketing', engagement: '8.7K', platform: 'Instagram' },
                { title: 'Review do novo iPhone', engagement: '12.4K', platform: 'YouTube' }
              ].map((content, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{content.title}</p>
                    <p className="text-sm text-muted-foreground">{content.platform}</p>
                  </div>
                  <span className="font-bold text-primary">{content.engagement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
