#!/bin/bash

echo "Iniciando teste CRUD da API de veículos..."

echo "Cadastrando primeiro veículo..."
curl -s -X POST http://localhost:3000/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"placa":"AAA-1111","montadora":"Volvo","modelo":"FH"}' >> crud_result.log

echo "" >> crud_result.log

echo "Cadastrando segundo veículo..."
curl -s -X POST http://localhost:3000/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"placa":"BBB-2222","montadora":"Scania","modelo":"P320"}' >> crud_result.log

echo "" >> crud_result.log

echo "Atualizando o primeiro veículo..."
curl -s -X PUT http://localhost:3000/api/v1/veiculos/1 \
-H "Content-Type: application/json" \
-d '{"placa":"AAA-9999","montadora":"Volvo","modelo":"FH16","status":"DISPONIVEL"}' >> crud_result.log

echo "" >> crud_result.log

echo "Removendo o segundo veículo..."
curl -s -X DELETE http://localhost:3000/api/v1/veiculos/2 >> crud_result.log

echo "" >> crud_result.log

echo "Teste CRUD finalizado. Verifique o arquivo crud_result.log"S
