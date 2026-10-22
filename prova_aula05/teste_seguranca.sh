
#!/bin/bash

URL="http://localhost:3018"
API_KEY="binario-tech-secret-2026"

echo "=== AUDITORIA DE SEGURANCA ==="

echo -e "\n1. Acesso sem API Key (esperado: 401)"
curl -s -i "$URL/api/v1/motoristas"

echo -e "\n2. API Key invalida (esperado: 401)"
curl -s -i -H "X-API-KEY: chave-errada" "$URL/api/v1/motoristas"

echo -e "\n3. CNH invalida (esperado: 400)"
curl -s -i -X POST "$URL/api/v1/motoristas" \
-H "Content-Type: application/json" \
-H "X-API-KEY: $API_KEY" \
-d '{"nome":"Joao Silva","cnh":"123","categoria":"E"}'

echo -e "\n4. Rota inexistente (esperado: 404)"
curl -s -i -H "X-API-KEY: $API_KEY" "$URL/api/v1/clientes"

echo -e "\n5. Consultar motoristas (esperado: 200)"
curl -s -i -H "X-API-KEY: $API_KEY" "$URL/api/v1/motoristas"

echo -e "\n6. Cadastrar motorista (esperado: 201)"
curl -s -i -X POST "$URL/api/v1/motoristas" \
-H "Content-Type: application/json" \
-H "X-API-KEY: $API_KEY" \
-d '{"nome":"Joao Silva","cnh":"12345678900","categoria":"E"}'

echo -e "\n7. Consultar manutencoes (esperado: 200)"
curl -s -i -H "X-API-KEY: $API_KEY" "$URL/api/v1/manutencoes"

echo -e "\n8. Cadastrar manutencao (esperado: 201)"
curl -s -i -X POST "$URL/api/v1/manutencoes" \
-H "Content-Type: application/json" \
-H "X-API-KEY: $API_KEY" \
-d '{"placa":"ABC1D23","descricao":"Troca de oleo","valor":850}'

echo -e "\n=== AUDITORIA CONCLUIDA ==="

