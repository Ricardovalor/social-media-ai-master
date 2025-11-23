#!/bin/bash

echo "🔍 Verificando estrutura do projeto..."

# Verificar package.json
if [ -f "package.json" ]; then
    echo "✅ package.json encontrado"
    echo "📋 Scripts disponíveis:"
    npm run
else
    echo "❌ package.json não encontrado"
    exit 1
fi

# Verificar se é Vite
if [ -f "vite.config.js" ] || [ -f "vite.config.ts" ]; then
    echo "🚀 Projeto Vite detectado"
    echo "💡 Comando: npm run dev ou npx vite dev"
fi

# Verificar se é Create React App
if [ -f "src/index.js" ] || [ -f "src/index.tsx" ]; then
    if grep -q "react-scripts" package.json; then
        echo "⚛️ Create React App detectado"
        echo "💡 Comando: npm start"
    fi
fi

echo ""
echo "📁 Verificando arquivos criados..."
find src/store src/services src/hooks src/types -name "*.ts" -o -name "*.tsx" 2>/dev/null

echo ""
echo "📊 Tamanho dos arquivos:"
for file in src/store/useAppStore.ts src/services/databaseService.ts src/hooks/usePosts.ts src/types/index.ts src/App.tsx; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        echo "  $file: $size bytes"
    else
        echo "  $file: ❌ Não encontrado"
    fi
done
