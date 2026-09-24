#!/bin/bash

echo "======================================================================="
echo "                AUDITORIA DE PROCESSOS PM2 - BINARIO TECH"
echo "======================================================================="

STATUS=$(pm2 jlist | jq -r '.[0].pm2_env.status // "unknown"')
RESTARTS=$(pm2 jlist | jq -r '.[0].pm2_env.restart_time // 0')
PID=$(pm2 jlist | jq -r '.[0].pid // 0')

echo "Status Atual: $STATUS"
echo "PID ativo: $PID"
echo "Contador de Restarts: $RESTARTS"

if [ "$STATUS" == "online" ]; then
    echo -e "\n[OK] A aplicacao esta rodando normalmente"
else
    echo -e "\n[ERRO] A aplicacao esta inativa. Tentando reiniciar..."
    pm2 restart api-telemetria
fi

echo "======================================================================="

