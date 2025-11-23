import { ContentGenerator } from '@/components/ai/ContentGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Zap } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Criação de Conteúdo</h1>
        <p className="text-muted-foreground">
          Gere conteúdo viral otimizado para todas as plataformas
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">124</p>
                <p className="text-sm text-muted-foreground">Conteúdos Gerados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Taxa de Engajamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">2.4M</p>
                <p className="text-sm text-muted-foreground">Visualizações Totais</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gerador de Conteúdo */}
      <ContentGenerator />

      {/* Templates Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Templates Rápidos</CardTitle>
          <CardDescription>
            Comece com templates pré-definidos para diferentes nichos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Marketing Digital', emoji: '💸' },
              { title: 'Fitness & Saúde', emoji: '💪' },
              { title: 'Investimentos', emoji: '📈' },
              { title: 'Tecnologia', emoji: '🤖' },
              { title: 'Educação', emoji: '🎓' },
              { title: 'Entretenimento', emoji: '🎬' }
            ].map((template) => (
              <div 
                key={template.title}
                className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <span className="font-medium">{template.title}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
