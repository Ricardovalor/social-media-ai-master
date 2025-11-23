'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Image, FileText, Music, Plus, Trash2 } from 'lucide-react';

export function BatchContentGenerator() {
  const [prompts, setPrompts] = useState(['']);
  const [generatedContents, setGeneratedContents] = useState<any[]>([]);

  const contentTypes = [
    { type: 'video', icon: Video, label: 'Vídeo Short', time: '30s', cost: 2 },
    { type: 'image', icon: Image, label: 'Imagem IA', time: '10s', cost: 1 },
    { type: 'script', icon: FileText, label: 'Roteiro', time: '15s', cost: 0.5 },
    { type: 'audio', icon: Music, label: 'Áudio/Narração', time: '20s', cost: 1.5 }
  ];

  const addPrompt = () => {
    setPrompts([...prompts, '']);
  };

  const removePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
  };

  const updatePrompt = (index: number, value: string) => {
    const newPrompts = [...prompts];
    newPrompts[index] = value;
    setPrompts(newPrompts);
  };

  const generateBatchContent = (type: string) => {
    // Simulação de geração de conteúdo em lote
    const newContents = prompts
      .filter(prompt => prompt.trim() !== '')
      .map((prompt, index) => ({
        id: Date.now() + index,
        type,
        prompt,
        timestamp: new Date(),
        status: 'generating'
      }));

    setGeneratedContents(prev => [...newContents, ...prev]);

    // Simular conclusão
    setTimeout(() => {
      setGeneratedContents(prev =>
        prev.map(item =>
          newContents.some(newContent => newContent.id === item.id)
            ? { ...item, status: 'completed', url: `/${type}-${item.id}` }
            : item
        )
      );
    }, 2000);
  };

  const getStatusClass = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Geração de Conteúdo em Lote</CardTitle>
          <CardDescription>
            Crie múltiplos conteúdos de uma vez com IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {prompts.map((prompt, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  placeholder="Descreva o conteúdo que deseja criar..."
                  value={prompt}
                  onChange={(e) => updatePrompt(index, e.target.value)}
                  className="min-h-24"
                />
                {prompts.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removePrompt(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <Button variant="outline" onClick={addPrompt} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Prompt
          </Button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contentTypes.map((contentType) => (
              <Button
                key={contentType.type}
                variant="outline"
                className="flex flex-col h-20 gap-2"
                onClick={() => generateBatchContent(contentType.type)}
                disabled={!prompts.some(prompt => prompt.trim() !== '')}
              >
                <contentType.icon className="w-5 h-5" />
                <span className="text-xs">{contentType.label}</span>
                <span className="text-xs text-gray-500">{contentType.time}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {generatedContents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Gerado em Lote</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedContents.map((content) => {
                const contentType = contentTypes.find(ct => ct.type === content.type);
                return (
                  <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {contentType?.icon && <contentType.icon className="w-4 h-4" />}
                      <div>
                        <p className="font-medium">{contentType?.label}</p>
                        <p className="text-sm text-gray-600">{content.prompt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(content.status)}`}>
                        {content.status === 'completed' ? 'Pronto' : 'Gerando...'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {content.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
