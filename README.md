AULA03
1. CRIAR O PROJETO

Entre no diretório do projeto:

cd ~/binario_tech

Crie a pasta da prova:

mkdir -p prova_aula03
cd prova_aula03

Confira o diretório:

pwd
2. CONFIGURAR O NODE.JS

Inicialize o projeto:

npm init -y

Instale o Express:

npm install express

Instale jq e httpie:

sudo apt-get update
sudo apt-get install -y jq httpie

Confira as instalações:

jq --version
http --version
3. CRIAR O SERVIDOR

Crie:

nano telemetria.js
telemetria.js — arquivo completo
const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/v1/scania", (req, res) => {
    res.json({
        montadora: "Scania",
        modelo: "R450",
        status: "OK",
        conexao: true,
        velocidade_media: 82
    });
});

app.get("/api/v1/mercedes", (req, res) => {
    res.json({
        montadora: "Mercedes-Benz",
        modelo: "Actros",
        status: "OK",
        conexao: true,
        velocidade_media: 78
    });
});

app.get("/api/v1/vw", (req, res) => {
    res.json({
        montadora: "Volkswagen",
        modelo: "Delivery",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de telemetria rodando na porta ${PORT}`);
});

Salve:

CTRL + O
ENTER
CTRL + X
4. EXECUTAR O SERVIDOR

Execute em segundo plano:

node telemetria.js &

A aplicação utiliza a porta:

3001
5. TESTAR AS ROTAS EXISTENTES
Scania
curl -s http://localhost:3001/api/v1/scania | jq .

Deve retornar:

{
  "montadora": "Scania",
  "modelo": "R450",
  "status": "OK",
  "conexao": true,
  "velocidade_media": 82
}
Mercedes-Benz
curl -s http://localhost:3001/api/v1/mercedes | jq .

Deve retornar:

{
  "montadora": "Mercedes-Benz",
  "modelo": "Actros",
  "status": "OK",
  "conexao": true,
  "velocidade_media": 78
}
Volkswagen
curl -s http://localhost:3001/api/v1/vw | jq .

Deve retornar:

{
  "montadora": "Volkswagen",
  "modelo": "Delivery",
  "status": "ALERTA",
  "conexao": false,
  "velocidade_media": 0
}
6. ADICIONAR A ROTA VOLVO

A prova exige uma quarta rota:

/api/v1/volvo

Dados da Volvo:

montadora: Volvo
modelo: FH 540
status: ALERTA
conexao: false
velocidade_media: 0

Antes de reiniciar, encerre o servidor atual:

ps aux | grep node

Encontre o PID de:

node telemetria.js

Encerre:

kill -9 PID

Agora edite:

nano telemetria.js
telemetria.js — arquivo completo atualizado
const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/v1/scania", (req, res) => {
    res.json({
        montadora: "Scania",
        modelo: "R450",
        status: "OK",
        conexao: true,
        velocidade_media: 82
    });
});

app.get("/api/v1/mercedes", (req, res) => {
    res.json({
        montadora: "Mercedes-Benz",
        modelo: "Actros",
        status: "OK",
        conexao: true,
        velocidade_media: 78
    });
});

app.get("/api/v1/vw", (req, res) => {
    res.json({
        montadora: "Volkswagen",
        modelo: "Delivery",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

app.get("/api/v1/volvo", (req, res) => {
    res.json({
        montadora: "Volvo",
        modelo: "FH 540",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de telemetria rodando na porta ${PORT}`);
});

Salve o arquivo.

Inicie novamente:

node telemetria.js &

Teste a nova rota:

curl -s http://localhost:3001/api/v1/volvo | jq .
7. TESTAR HTTPie E CRIAR mercedes.json

Faça uma requisição para Mercedes usando HTTPie:

http GET http://localhost:3001/api/v1/mercedes > mercedes.json

Confira:

cat mercedes.json

Visualize formatado:

cat mercedes.json | jq .

O arquivo mercedes.json deve conter os dados da rota Mercedes.

8. USAR jq PARA FILTRAR OS DADOS
Scania — somente modelo
curl -s http://localhost:3001/api/v1/scania | jq '.modelo'

Resultado:

"R450"
Mercedes — somente status
jq '.status' mercedes.json

Resultado:

"OK"
Volkswagen — somente montadora e status
curl -s http://localhost:3001/api/v1/vw | jq '{montadora, status}'

Resultado:

{
  "montadora": "Volkswagen",
  "status": "ALERTA"
}
9. CRIAR O SCRIPT DE TELEMETRIA

Crie:

nano testar_telemetria.sh
testar_telemetria.sh — arquivo completo
#!/bin/bash

echo "========================================="
echo "  AUDITORIA DE TELEMETRIA - BINARIO TECH "
echo "  Data/Hora: $(date)"
echo "========================================="

echo -e "\n[1] Testando Rota Scania..."
curl -s http://localhost:3001/api/v1/scania | jq .

echo -e "\n[2] Testando Rota Mercedes-Benz..."
curl -s http://localhost:3001/api/v1/mercedes | jq .

echo -e "\n[3] Testando Rota Volkswagen..."
curl -s http://localhost:3001/api/v1/vw | jq .

echo -e "\n[4] Testando Rota Volvo..."
curl -s http://localhost:3001/api/v1/volvo | jq .

echo -e "\n-----------------------------------------"
echo "Auditoria finalizada com sucesso!"

Dê permissão:

chmod +x testar_telemetria.sh

Confira:

ls -l testar_telemetria.sh

Execute:

./testar_telemetria.sh
10. CRIAR O relatorio.log

Salve toda a saída do script:

./testar_telemetria.sh > relatorio.log

Confira o conteúdo:

cat relatorio.log

Confira o arquivo:

ls -l relatorio.log

O relatorio.log deve conter a execução das quatro rotas.

11. CONFIGURAR O package.json

Abra:

nano package.json

O arquivo precisa possuir o script:

"start": "node telemetria.js"

O package.json completo deverá manter as informações geradas pelo npm e ficar semelhante a:

{
  "name": "prova_aula03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node telemetria.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  }
}

Se o npm instalou outra versão do Express, mantenha a versão que já estiver no seu arquivo.

O importante é possuir:

"start": "node telemetria.js"
12. TESTAR npm start

Se o servidor estiver rodando, localize:

ps aux | grep node

Encerre:

kill -9 PID

Execute:

npm start

Deve aparecer:

Servidor de telemetria rodando na porta 3001

Para parar:

CTRL + C
13. IDENTIFICAR E ENCERRAR O PROCESSO

Execute:

node telemetria.js &

Procure o processo:

ps aux | grep node

Localize:

node telemetria.js

Pegue o PID e execute:

kill -9 PID

Confirme:

ps aux | grep node
14. CONFERIR OS ARQUIVOS

Execute:

ls -la

A pasta deverá possuir os principais arquivos:

mercedes.json
package.json
package-lock.json
relatorio.log
telemetria.js
testar_telemetria.sh
15. GIT

Confira o status:

git status

Confira a branch:

git branch

A prova deve ser entregue na:

main

Adicione os arquivos:

git add telemetria.js mercedes.json testar_telemetria.sh relatorio.log package.json package-lock.json

Confira:

git status

Faça o commit:

git commit -m "prova pratica aula 03"

Atualize o repositório:

git pull origin main

Envie para o GitHub:

git push origin main
16. O QUE PRECISA ESTAR PRONTO
API

A aplicação deve possuir:

GET /api/v1/scania
GET /api/v1/mercedes
GET /api/v1/vw
GET /api/v1/volvo

Porta:

3001
Arquivos

Você precisa ter:

prova_aula03/
├── telemetria.js
├── testar_telemetria.sh
├── mercedes.json
├── relatorio.log
├── package.json
└── package-lock.json
Comandos que precisam funcionar
curl -s http://localhost:3001/api/v1/scania | jq '.modelo'
http GET http://localhost:3001/api/v1/mercedes > mercedes.json
jq '.status' mercedes.json
curl -s http://localhost:3001/api/v1/vw | jq '{montadora, status}'
curl -s http://localhost:3001/api/v1/volvo | jq .
./testar_telemetria.sh
./testar_telemetria.sh > relatorio.log
npm start
ps aux | grep node
kill -9 PID
git push origin main
