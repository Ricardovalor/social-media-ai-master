import { useState, useCallback } from 'react';

interface UseAIGeneratorProps {
  onContentGenerated?: (content: string) => void;
}

export const useAIGenerator = ({ onContentGenerated }: UseAIGeneratorProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(async (
    prompt: string,
    platform: string,
    tone: string
  ) => {
    if (!prompt.trim()) {
      setError('Por favor, insira um prompt válido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulação de API call - substituir por chamada real posteriormente
      await new Promise(resolve => setTimeout(resolve, 2000));

      const templates = {
        twitter: {
          professional: `🚀 ${prompt}\n\n💡 Insights estratégicos para maximizar resultados\n\n#MarketingDigital #Inovação`,
          casual: `🎉 ${prompt}\n\n✨ Dica rápida que vai fazer diferença!\n\n#Dica #SocialMedia`,
          funny: `😂 ${prompt}\n\n🤣 Não conta que eu te contei!\n\n#Humor #Viral`,
          inspirational: `🌟 ${prompt}\n\n💫 Lembre-se: pequenas ações geram grandes resultados!\n\n#Motivação #Sucesso`
        },
        instagram: {
          professional: `📸 ${prompt}\n\n✨ Dica profissional: Use cores vibrantes e hashtags relevantes\n\n💼 Perfect for business growth\n\n#InstagramMarketing #ConteúdoVisual`,
          casual: `🤳 ${prompt}\n\n❤️ Marca aquele amigo que precisa ver isso!\n\n👉 Double tap if you agree!\n\n#Instagram #Daily`,
          funny: `😆 ${prompt}\n\n🤪 TAG dos amigos nos comentários!\n\n📸 Este post ficou épico!\n\n#Funny #Memes`,
          inspirational: `✨ ${prompt}\n\n💖 Espalhe positividade hoje!\n\n🌻 Small steps, big changes\n\n#Inspiração #Positividade`
        }
      };

      const content = (templates as any)[platform]?.[tone] ||
        `📝 Conteúdo para ${platform} (${tone}):\n\n${prompt}\n\n✨ Gerado com sucesso!`;

      onContentGenerated?.(content);
      return content;
    } catch (err) {
      setError('Erro ao gerar conteúdo. Tente novamente.');
      console.error('AI Generation error:', err);
    } finally {
      setLoading(false);
    }
  }, [onContentGenerated]);

  return {
    generateContent,
    loading,
    error,
    clearError: () => setError(null)
  };
};
