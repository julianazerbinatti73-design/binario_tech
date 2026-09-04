#!/bin/bash
echo "=========================================================="
echo" AUDITORIA DE SEEDS E TRATAMENTO DE ERROS - AULA10"
echo "========================================================="

echo -e "\n[1] Consultando dados pre-populados pelo Seed..."
curl -s http://localhost:3000/api/v1/frota | jq .

echo -e "\n[2] Testando erro de placa duplicada (Conflito - Status 409)..."
curl -s -x POST http://localhost:3000/api/v1/frota/veiculo \
	-H "Content-Type: apllication/json" \
	-d '{"placa":"VOL-1010","montadora":"Volvo","modelo":"FH540"}' | jq .
