#!/bin/bash

# Script para limpar arquivos de log e configurações sensíveis

echo "🧹 Limpando arquivos de log e configurações sensíveis..."

# Remover arquivos de log
find . -name "*.log" -type f -delete
find . -name "hs_err_pid*.log" -type f -delete
find . -name "replay_pid*.log" -type f -delete

# Remover arquivos .env se existirem (exceto .env.example)
find . -name ".env" -type f -not -name ".env.example" -delete

# Remover arquivos temporários
find . -name "*.tmp" -type f -delete
find . -name "*.temp" -type f -delete

echo "✅ Limpeza concluída!"
echo "📝 Lembre-se de:"
echo "   - Configurar o arquivo .env com suas credenciais"
echo "   - Ajustar o IP no frontend mobile"
echo "   - Nunca commitar o arquivo .env"
