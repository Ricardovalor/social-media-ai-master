import { PredictiveAnalytics } from '@/components/analytics/PredictiveAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Clock, Zap } from 'lucide-react';

export default function PredictiveAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Preditivo</h1>
        <p className="text-muted-foreground">
          Previsões e insights baseados em machine learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Precisão</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">+47%</p>
                <p className="text-sm text-muted-foreground">Engajamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">19h</p>
                <p className="text-sm text-muted-foreground">Melhor Horário</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">82%</p>
                <p className="text-sm text-muted-foreground">Confiança</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PredictiveAnalytics />

      <Card>
        <CardHeader>
          <CardTitle>Recomendações de Conteúdo</CardTitle>
          <CardDescription>
            Sugestões baseadas em análise preditiva
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { topic: 'Tendências TikTok', engagement: 87, virality: 92 },
              { topic: 'YouTube Shorts', engagement: 78, virality: 85 },
              { topic: 'Instagram Reels', engagement: 82, virality: 88 },
              { topic: 'Twitter Threads', engagement: 75, virality: 80 }
            ].map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{rec.topic}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm text-gray-600">Engajamento: {rec.engagement}%</span>
                    <span className="text-sm text-gray-600">Viralidade: {rec.virality}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Recomendado
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
