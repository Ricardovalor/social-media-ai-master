import { SmartScheduler } from '@/components/scheduling/SmartScheduler';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Zap, TrendingUp, Users } from 'lucide-react';

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Automação & Agendamento</h1>
        <p className="text-muted-foreground">
          Programe e automatize seu conteúdo para maximizar o engajamento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Posts Agendados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">+32%</p>
                <p className="text-sm text-muted-foreground">Engajamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.4K</p>
                <p className="text-sm text-muted-foreground">Visualizações</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SmartScheduler />

      <Card>
        <CardHeader>
          <CardTitle>Automações Rápidas</CardTitle>
          <CardDescription>
            Configure automações para simplificar seu workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Repost Automático', description: 'Repost conteúdo viral automaticamente', icon: '🔄' },
              { title: 'Resposta IA', description: 'Resposta automática para comentários', icon: '🤖' },
              { title: 'Análise de Tendências', description: 'Identifica trends automaticamente', icon: '📈' },
              { title: 'Cross-posting', description: 'Publica em múltiplas plataformas', icon: '🔄' },
              { title: 'Alertas de Performance', description: 'Notifica sobre mudanças', icon: '🔔' },
              { title: 'Otimização de Hashtags', description: 'Gera hashtags otimizadas', icon: '🏷️' }
            ].map((automation, index) => (
              <div key={index} className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{automation.icon}</span>
                  <div>
                    <h3 className="font-semibold">{automation.title}</h3>
                    <p className="text-sm text-gray-600">{automation.description}</p>
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
