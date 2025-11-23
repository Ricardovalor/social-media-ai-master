#!/bin/bash

echo "🔧 Correção definitiva de todos os arquivos problemáticos..."

# 1. Corrigir useAIGenerator - versão mínima sem template strings
cat > packages/ui/hooks/useAIGenerator.ts << 'HOOK_EOF'
import { useState } from 'react';

export const useAIGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent = async (prompt: string, platform?: string, tone?: string) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const content = "Conteúdo gerado para " + platform + " com tom " + tone + ": " + prompt;
      setGeneratedContent(content);
    } catch (err) {
      setError('Erro ao gerar conteúdo');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generatedContent,
    generateContent,
  };
};
HOOK_EOF

echo "✅ useAIGenerator corrigido"

# 2. Corrigir API route - versão mínima sem template strings
mkdir -p src/app/api/ai/generate
cat > src/app/api/ai/generate/route.ts << 'API_EOF'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, tone } = await request.json();
    await new Promise(resolve => setTimeout(resolve, 1500));
    const content = "Conteúdo para " + platform + " com tom " + tone + ": " + prompt;
    return NextResponse.json({ content: content });
  } catch (error) {
    return NextResponse.json({ error: 'Falha na geração' }, { status: 500 });
  }
}
API_EOF

echo "✅ API route corrigida"

# 3. Corrigir AnalyticsDashboard - versão mínima
cat > packages/analytics/src/components/AnalyticsDashboard.tsx << 'ANALYTICS_EOF'
import React from 'react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Analytics</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold">TikTok</p>
          <p className="text-green-600">45.2K seguidores ↗ +15%</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold">Instagram</p>
          <p className="text-green-600">28.7K seguidores ↗ +9%</p>
        </div>
      </div>
    </div>
  );
};
ANALYTICS_EOF

echo "✅ AnalyticsDashboard corrigido"

# 4. Corrigir MonetizationDashboard - versão mínima
cat > packages/monetization/src/components/MonetizationDashboard.tsx << 'MONET_EOF'
import React from 'react';

export const MonetizationDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Monetização</h2>
      <div className="space-y-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="font-semibold text-gray-800">Amazon Afiliados</p>
          <p className="text-green-600">R$ 3.247 ↗ +15%</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="font-semibold text-gray-800">Google Adsense</p>
          <p className="text-green-600">R$ 1.876 ↗ +8%</p>
        </div>
      </div>
    </div>
  );
};
MONET_EOF

echo "✅ MonetizationDashboard corrigido"

# 5. Corrigir página principal - versão mínima
cat > src/app/page.tsx << 'PAGE_EOF'
"use client";

import { MetricsDashboard } from "../../packages/ui/components/dashboard/MetricsDashboard";
import { AIGenerator } from "../../packages/ui/components/ai/AIGenerator";
import { MonetizationDashboard } from "../../packages/monetization/src/components/MonetizationDashboard";
import { AnalyticsDashboard } from "../../packages/analytics/src/components/AnalyticsDashboard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🚀</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Social Media AI Master</h1>
              <p className="text-gray-600 text-sm">Plataforma para Criadores</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <MetricsDashboard />
        <AnalyticsDashboard />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AIGenerator />
          <MonetizationDashboard />
        </div>
      </div>
    </div>
  );
}
PAGE_EOF

echo "✅ Página principal corrigida"

# 6. Verificar se os arquivos foram criados corretamente
echo "📁 Verificando arquivos:"
ls -la packages/ui/hooks/useAIGenerator.ts
ls -la src/app/api/ai/generate/route.ts
ls -la packages/analytics/src/components/AnalyticsDashboard.tsx
ls -la packages/monetization/src/components/MonetizationDashboard.tsx

echo "📏 Verificando tamanhos:"
wc -l packages/ui/hooks/useAIGenerator.ts
wc -l src/app/api/ai/generate/route.ts
wc -l packages/analytics/src/components/AnalyticsDashboard.tsx
wc -l packages/monetization/src/components/MonetizationDashboard.tsx

echo "🎉 TODOS OS ARQUIVOS FORAM CORRIGIDOS!"
