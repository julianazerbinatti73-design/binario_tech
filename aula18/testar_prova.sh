
#!/bin/bash

URL="http://localhost:3018"
EMAIL="aluno_teste_$(date +%s)@teste.com"
SENHA="123456"

echo "========================================"
echo " TESTE DA AVALIAÇÃO PRÁTICA - AULA 18"
echo "========================================"

echo ""
echo "[1] Cadastrando usuário..."

CADASTRO=$(curl -s -X POST "$URL/api/v1/prova/register" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}")

echo "$CADASTRO" | jq .

echo ""
echo "[2] Realizando login..."

LOGIN=$(curl -s -X POST "$URL/api/v1/prova/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}")

echo "$LOGIN" | jq .

TOKEN=$(echo "$LOGIN" | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
    echo ""
    echo "ERRO: não foi possível obter o token JWT."
    exit 1
fi

echo ""
echo "[3] Token obtido com sucesso."
echo "Token: $TOKEN"

echo ""
echo "[4] Acessando rota protegida..."

curl -s -X GET "$URL/api/v1/prova/relatorio" \
    -H "Authorization: Bearer $TOKEN" | jq .

echo ""
echo "========================================"
echo " TESTE FINALIZADO"
echo "========================================"

