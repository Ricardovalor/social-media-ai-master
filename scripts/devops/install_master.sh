#!/bin/bash
echo "🚀 Instalando Sistema Master..."

# Criar diretório
mkdir -p ~/master-system/{logs,backups}
cd ~/master-system

# Baixar script principal (substitua pelo conteúdo real se necessário)
cat > master.sh << 'MASTER_EOF'
#!/bin/bash
# [O conteúdo completo do master.sh vai aqui]
MASTER_EOF

# Tornar executável
chmod +x master.sh

# Configurar alias
echo "alias master='~/master-system/master.sh'" >> ~/.bashrc

echo "✅ Instalação concluída!"
echo "📁 Diretório: ~/master-system"
echo "🎯 Comandos disponíveis após reiniciar o terminal:"
echo "   master health, master monitor, master clean, etc."
