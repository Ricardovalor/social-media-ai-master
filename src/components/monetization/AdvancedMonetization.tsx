'use client';

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
                    <div className={'p-2 rounded-full ' + colors.bg}>
                      <DollarSign className={'w-4 h-4 ' + colors.text} />
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