#!/bin/bash

BASE_URL="http://localhost:3018/api/v1/veiculos"
LOG="crud_result.log"

echo "========================================" > "$LOG"
echo "       TESTE CRUD - BINARIO TECH" >> "$LOG"
echo "        Data/Hora: $(date)" >> "$LOG"
echo "========================================" >> "$LOG"

echo "" >> "$LOG"
echo "[1] CADASTRANDO VEICULO 1..." >> "$LOG"

VEICULO1=$(curl -s -X POST "$BASE_URL" \
-H "Content-Type: application/json" \
-d '{"placa":"AAA-2026","montadora":"Scania","modelo":"R500"}')

echo "$VEICULO1" | jq . >> "$LOG"

ID1=$(echo "$VEICULO1" | jq -r '.id')

echo "" >> "$LOG"
echo "[2] CADASTRANDO VEICULO 2..." >> "$LOG"

VEICULO2=$(curl -s -X POST "$BASE_URL" \
-H "Content-Type: application/json" \
-d '{"placa":"BBB-2026","montadora":"Mercedes-Benz","modelo":"Actros"}')

echo "$VEICULO2" | jq . >> "$LOG"

ID2=$(echo "$VEICULO2" | jq -r '.id')

echo "" >> "$LOG"
echo "[3] ATUALIZANDO VEICULO $ID1..." >> "$LOG"

ATUALIZADO=$(curl -s -X PATCH "$BASE_URL/$ID1/status" \
-H "Content-Type: application/json" \
-d '{"status":"EM_ROTA"}')

echo "$ATUALIZADO" | jq . >> "$LOG"

echo "" >> "$LOG"
echo "[4] DELETANDO VEICULO $ID2..." >> "$LOG"

DELETADO=$(curl -s -X DELETE "$BASE_URL/$ID2")

echo "$DELETADO" | jq . >> "$LOG"

echo "" >> "$LOG"
echo "========================================" >> "$LOG"
echo "       CRUD FINALIZADO" >> "$LOG"
echo "========================================" >> "$LOG"

echo "Teste CRUD concluido. Resultado salvo em $LOG"
