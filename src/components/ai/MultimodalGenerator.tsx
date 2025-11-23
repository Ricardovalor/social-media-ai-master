'use client';

import { useState } from 'react';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Video, Image, FileText, Music } from 'lucide-react';

export function MultimodalGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);

  const contentTypes = [
    { type: 'video', icon: Video, label: 'Vídeo Short', time: '30s', cost: 2 },
    { type: 'image', icon: Image, label: 'Imagem IA', time: '10s', cost: 1 },
    { type: 'script', icon: FileText, label: 'Roteiro', time: '15s', cost: 0.5 },
    { type: 'audio', icon: Music, label: 'Áudio/Narração', time: '20s', cost: 1.5 }
  ];

  const generateContent = (type: string) => {
    const newContent = {
      id: Date.now(),
      type,
      prompt,
      timestamp: new Date(),
      status: 'generating'
    };
    
    setGeneratedContent(prev => [newContent, ...prev]);
    
    setTimeout(() => {
      setGeneratedContent(prev => 
        prev.map(item => 
          item.id === newContent.id 
            ? { ...item, status: 'completed', url: '/' + type + '-' + Date.now() }
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
          <CardTitle>Gerador de Conteúdo Multimodal</CardTitle>
          <CardDescription>
            Crie vídeos, imagens, áudio e textos com IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Descreva o conteúdo que deseja criar..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-24"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contentTypes.map((contentType) => (
              <Button
                key={contentType.type}
                variant="outline"
                className="flex flex-col h-20 gap-2"
                onClick={() => generateContent(contentType.type)}
                disabled={!prompt.trim()}
              >
                <contentType.icon className="w-5 h-5" />
                <span className="text-xs">{contentType.label}</span>
                <span className="text-xs text-gray-500">{contentType.time}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {generatedContent.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Gerado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedContent.map((content) => {
                const contentType = contentTypes.find(ct => ct.type === content.type);
                return (
                  <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {contentType?.icon && React.createElement(contentType.icon, { className: "w-4 h-4" })}
                      <div>
                        <p className="font-medium">{contentType?.label}</p>
                        <p className="text-sm text-gray-600">{content.prompt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={'text-xs px-2 py-1 rounded-full ' + getStatusClass(content.status)}>
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
