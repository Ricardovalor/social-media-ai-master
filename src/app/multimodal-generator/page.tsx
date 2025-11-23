import { MultimodalGenerator } from '@/components/ai/MultimodalGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Image, FileText, Music, Zap, Clock } from 'lucide-react';

export default function MultimodalGeneratorPage() {
  const getStatusClass = (status: string) => {
    return status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gerador Multimodal IA</h1>
        <p className="text-muted-foreground">
          Crie conteúdo em múltiplos formatos com inteligência artificial
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Video className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Vídeos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Image className="w-6 h-6 text-blue-500" alt="Ícone de imagem" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-sm text-muted-foreground">Imagens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">36</p>
                <p className="text-sm text-muted-foreground">Roteiros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Music className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Áudios</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <MultimodalGenerator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Templates Rápidos
            </CardTitle>
            <CardDescription>
              Modelos pré-configurados para conteúdo viral
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Hook em 3 segundos', type: 'video', duration: '15s' },
                { name: 'Before/After Impactante', type: 'image', duration: 'Instantâneo' },
                { name: 'Storytelling Emocional', type: 'script', duration: '60s' },
                { name: 'Narração Profissional', type: 'audio', duration: '30s' }
              ].map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-gray-600">{template.type} • {template.duration}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Usar
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Histórico de Geração
            </CardTitle>
            <CardDescription>
              Seus conteúdos gerados recentemente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Vídeo TikTok - Tendências', date: '2 min atrás', status: 'Concluído' },
                { name: 'Imagem Instagram - Produto', date: '5 min atrás', status: 'Concluído' },
                { name: 'Roteiro YouTube - Tutorial', date: '10 min atrás', status: 'Concluído' },
                { name: 'Áudio Podcast - Entrevista', date: '15 min atrás', status: 'Processando' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
