#!/bin/bash
echo "[Binario Tech] Encerrando processos Node.js..."
pkill -f ocorrencias_api.js || echo "Nenhum processo rodando."

echo "[Binario Tech] Removendo arquivo ocorrencias.json..."
rm -f ocorrencias.json

echo "[Binario Tech] Ambiente resetado com sucesso!"

