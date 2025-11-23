#!/bin/bash

echo "🧪 INICIANDO TESTES COMPLETOS DO PROJETO"

# Teste 1: Build do projeto
echo "🔨 Testando build..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build: SUCESSO"
else
    echo "❌ Build: FALHA"
    exit 1
fi

# Teste 2: Iniciar servidor de desenvolvimento
echo "🌐 Testando servidor de desenvolvimento..."
npm run dev &
DEV_PID=$!
sleep 10

# Teste 3: Verificar se as páginas estão acessíveis
echo "📄 Testando páginas..."
PAGES=("/" "/analytics" "/content" "/automation" "/ai-chat")
for page in "${PAGES[@]}"; do
    curl -s -o /dev/null -w "%{http_code}" http://localhost:3003$page
    if [ $? -eq 0 ]; then
        echo "✅ Página $page: OK"
    else
        echo "❌ Página $page: FALHA"
    fi
done

# Teste 4: Verificar API
echo "🔌 Testando API..."
curl -s http://localhost:3003/api/ai/generate
if [ $? -eq 0 ]; then
    echo "✅ API: OK"
else
    echo "❌ API: FALHA"
fi

# Parar servidor
kill $DEV_PID 2>/dev/null

echo "🎉 TESTES CONCLUÍDOS!"
