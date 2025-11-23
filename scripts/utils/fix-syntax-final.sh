#!/bin/bash

echo "🔧 Corrigindo erros de sintaxe (versão final)..."

# 1. Corrigir useAIGenerator
cat > packages/ui/hooks/useAIGenerator.ts << 'HOOK_EOF'
import { useState } from 'react';

export interface AIGeneratorOptions {
  onContentGenerated?: (content: string) => void;
}

export const useAIGenerator = (options?: AIGeneratorOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent = async (prompt: string, platform?: string, tone?: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulação de IA - substituir por API real depois
      const response = await new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            const platformText = platform ? ` para ${platform}` : '';
            const toneText = tone ? ` no tom ${tone}` : '';
            resolve(`🎯 CONTEÚDO GERADO${platformText}${toneText}:\n\n"${prompt}"\n\n💡 Dicas para viralizar:\n• Use hashtags estratégicas\n• Poste nos horários de pico\n• Engaje com seus seguidores\n• Teste diferentes formatos\n\n🎊 BÔNUS: Interaja com os comentários para aumentar o alcance!`);
          } else {
            reject(new Error('Falha temporária na geração. Tente novamente.'));
          }
        }, 2000);
      });
      
      setGeneratedContent(response);
      options?.onContentGenerated?.(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearContent = () => setGeneratedContent('');

  return {
    loading,
    error,
    generatedContent,
    generateContent,
    clearError,
    clearContent,
  };
};
HOOK_EOF

echo "✅ useAIGenerator corrigido"

# 2. Corrigir API route
cat > src/app/api/ai/generate/route.ts << 'API_EOF'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, tone } = await request.json();

    // Simulação de IA - substituir por integração real com OpenAI, etc.
    const generatedContent = `🎯 CONTEÚDO GERADO para ${platform} no tom ${tone}:\n\n"${prompt}"\n\n💡 Dicas para viralizar:\n• Use hashtags estratégicas\n• Poste nos horários de pico\n• Engaje com seus seguidores\n• Teste diferentes formatos`;

    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha temporária na geração. Tente novamente.' },
      { status: 500 }
    );
  }
}
API_EOF

echo "✅ API route corrigida"

echo "🎉 Correções de sintaxe aplicadas!"
