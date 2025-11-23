'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles, Copy, RefreshCw } from 'lucide-react';

export function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('tiktok');
  const [tone, setTone] = useState('engaging');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulação de geração de conteúdo com IA
    setTimeout(() => {
      const hooks = [
        `Você não vai acreditar no que descobri sobre ${topic}...`,
        `Pare tudo que está fazendo! ${topic} nunca mais será o mesmo!`,
        `Especialistas estão chocados com essa descoberta sobre ${topic}!`,
        `Atenção! Isso vai revolucionar como você vê ${topic}!`
      ];
      
      const selectedHook = hooks[Math.floor(Math.random() * hooks.length)];
      
      setGeneratedContent(`
🎯 HOOK VIRAL: ${selectedHook}

📝 ROTEIRO:
• 0-3s: ${selectedHook}
• 3-8s: Apresente o problema de forma dramática
• 8-15s: Mostre a solução surpreendente
• 15-25s: Demonstração prática
• 25-30s: Call-to-action urgente

💡 DICAS:
• Use transições rápidas
• Música trending do momento
• Textos grandes e cores vibrantes
• Expressões faciais exageradas

🏷️ HASHTAGS: #${topic.replace(/\s+/g, '')} #viral #dica #${platform}
      `);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Gerador de Conteúdo IA
          </CardTitle>
          <CardDescription>
            Crie hooks virais e roteiros otimizados para suas redes sociais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Tópico do Conteúdo</label>
            <Textarea
              placeholder="Ex: marketing digital, receitas fitness, dicas de investimento..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Plataforma</label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram Reels</option>
                <option value="youtube">YouTube Shorts</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Tom</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="engaging">Engajante</option>
                <option value="educational">Educativo</option>
                <option value="funny">Humorístico</option>
                <option value="dramatic">Dramático</option>
              </select>
            </div>
          </div>
          
          <Button 
            onClick={generateContent}
            disabled={!topic.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Gerar Conteúdo com IA
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo Gerado</CardTitle>
          <CardDescription>
            Hook viral + roteiro completo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
                {generatedContent}
              </div>
              <Button onClick={copyToClipboard} className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copiar para Área de Transferência
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Seu conteúdo aparecerá aqui</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
