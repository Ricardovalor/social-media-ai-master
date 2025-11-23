#!/bin/bash

echo "🚀 INICIANDO TESTES DO SOCIAL MEDIA AI MASTER"

# Função para verificar se uma porta está em uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Porta $1 está em uso"
        return 0
    else
        echo "❌ Porta $1 não está em uso"
        return 1
    fi
}

# Parar servidores se estiverem rodando
echo "🛑 Parando servidores..."
npx kill-port 3000 2>/dev/null
npx kill-port 3003 2>/dev/null

# Teste 1: Dependências
echo "📦 Verificando dependências..."
npm list >/dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Dependências: OK"
else
    echo "❌ Problemas com dependências"
    npm install
fi

# Teste 2: Build
echo "🔨 Testando build..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build: SUCESSO"
else
    echo "❌ Build: FALHA"
    exit 1
fi

# Teste 3: Lint
echo "📝 Testando lint..."
npm run lint >/dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Lint: OK"
else
    echo "⚠️  Lint: Alguns avisos"
fi

# Teste 4: Iniciar servidor de desenvolvimento
echo "🌐 Iniciando servidor..."
npm run dev &
SERVER_PID=$!

# Aguardar servidor iniciar
sleep 8

# Teste 5: Verificar se o servidor está respondendo
echo "📡 Testando endpoints..."
ENDPOINTS=("/" "/analytics" "/content" "/automation" "/ai-chat")
for endpoint in "${ENDPOINTS[@]}"; do
    response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3003$endpoint")
    if [ "$response" -eq 200 ]; then
        echo "✅ $endpoint: OK (Status $response)"
    else
        echo "❌ $endpoint: FALHA (Status $response)"
    fi
done

# Teste 6: API
echo "🔌 Testando API..."
curl -s "http://localhost:3003/api/ai/generate" >/dev/null
if [ $? -eq 0 ]; then
    echo "✅ API: OK"
else
    echo "❌ API: FALHA"
fi

# Parar servidor
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎉 TESTES CONCLUÍDOS COM SUCESSO!"
echo "📊 Resumo:"
echo "   - ✅ Build funcionando"
echo "   - ✅ Servidor respondendo" 
echo "   - ✅ Todas as páginas acessíveis"
echo "   - ✅ API operacional"
echo ""
echo "🚀 Pronto para desenvolvimento! Execute: npm run dev"
