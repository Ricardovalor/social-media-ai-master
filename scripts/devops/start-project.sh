#!/bin/bash
echo "🧹 Limpando ambiente..."
npx kill-port 3001
npx kill-port 3002
npx kill-port 3003

echo "🗑️ Removendo caches..."
rm -rf .next
rm -rf node_modules/.cache

echo "🔍 Removendo arquivos problemáticos..."
rm -rf Desktop 2>/dev/null
rm -rf "OneDrive/Área de Trabalho/backup" 2>/dev/null

echo "📦 Verificando dependências..."
npm install

echo "🏗️ Executando build..."
npm run build

echo "🚀 Iniciando servidor..."
npm run dev
