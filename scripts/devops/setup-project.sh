#!/bin/bash

echo "🚀 Configurando Social Media AI Master Platform..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js primeiro."
    exit 1
fi

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Verificar build
echo "🔨 Verificando build..."
npm run build

# Verificar TypeScript
echo "📝 Verificando TypeScript..."
npx tsc --noEmit

echo "✅ Configuração concluída!"
echo "🎯 Próximos passos:"
echo "   1. npm run dev    - Iniciar servidor de desenvolvimento"
echo "   2. git remote set-url origin SUA_URL_DO_GITHUB"
echo "   3. git push -u origin master"
