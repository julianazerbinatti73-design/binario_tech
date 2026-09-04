#!/bin/bash

echo "Teste de segurança" > audit_seguranca.log

echo "Tentativa 1 sem chave" >> audit_seguranca.log
curl -i -X POST http://localhost:3000/api/v1/motoristas \
-H "Content-Type: application/json" \
-d '{"cnh":"12345678901"}' >> audit_seguranca.log

echo "Tentativa 2 sem chave" >> audit_seguranca.log
curl -i -X POST http://localhost:3000/api/v1/motoristas \
-H "Content-Type: application/json" \
-d '{"cnh":"12345678901"}' >> audit_seguranca.log

echo "Tentativa 3 sem chave" >> audit_seguranca.log
curl -i -X POST http://localhost:3000/api/v1/motoristas \
-H "Content-Type: application/json" \
-d '{"cnh":"12345678901"}' >> audit_seguranca.log

echo "Tentativa com chave valida" >> audit_seguranca.log
curl -i -X POST http://localhost:3000/api/v1/motoristas \
-H "Content-Type: application/json" \
-H "X-API-KEY: binario-tech-secret-2026" \
-d '{"cnh":"12345678901"}' >> audit_seguranca.log
