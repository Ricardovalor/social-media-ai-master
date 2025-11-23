#!/bin/bash
echo "🧹 Limpando ambiente..."
npx kill-port 3001
npx kill-port 3002
sleep 2
echo "🔨 Executando build..."
npm run build
echo "🚀 Iniciando servidor..."
npm run dev
