Exercícios — PBE1 Binário Tech

Aula 01

Exercício 1

Enunciado:
Criar um arquivo chamado dev.json usando o editor de texto nano.

Comando:

nano dev.json

Exercício 2

Enunciado:
Visualizar o conteúdo do arquivo criado diretamente no terminal.

Comando:

cat dev.json

Exercício 3

Enunciado:
Contar o número de linhas do arquivo usando comando do Linux.

Comando:

wc -l dev.json

Aula 02

Exercício 01

Enunciado:
Verifique o diretório atual de trabalho e liste todos os arquivos, incluindo arquivos ocultos e detalhes de permissão (pwd e ls -la).

Comandos:

pwd
ls -la

Exercício 02

Enunciado:
Exiba as variáveis de ambiente do sistema e filtre apenas as variáveis que contenham a palavra USER ou SHELL utilizando o operador pipe | e grep.

Comando:

env | grep -E 'USER|SHELL'

Exercício 03

Enunciado:
Identifique o número do processo (PID) em que o servidor node servidor.js está rodando no seu terminal utilizando o comando ps aux | grep node.

Comando:

ps aux | grep node

Exercício 04

Enunciado:
Verifique se a porta de rede 3000 está aberta e escutando conexões usando o comando netstat -tuln ou ss -tuln.

Comandos:

netstat -tuln | grep :3000

ou

ss -tuln | grep :3000

Exercício 05

Enunciado:
Crie um arquivo chamado ambiente_info.txt contendo a data atual do sistema, o nome da máquina (hostname) e o uso de memória (date, hostname, free -h) redirecionando a saída com o operador >.

Comando:

{ date; hostname; free -h; } > ambiente_info.txt

Exercício 06

Enunciado:
Inspecione o arquivo package.json do seu projeto usando o comando cat e valide se a dependência express está registrada corretamente.

Comandos:

cat package.json

cat package.json | grep express

Exercício 07

Enunciado:
Instale o pacote nodemon como dependência de desenvolvimento (npm install -D nodemon) e confirme as alterações ocorridas no package.json.

Comandos:

npm install -D nodemon

cat package.json

Exercício 08

Enunciado:
Utilize a ferramenta jq para extrair apenas o campo "dependencies" do arquivo package.json.

Comando:

cat package.json | jq .dependencies

Exercício 09

Enunciado:
Crie um script customizado dentro de package.json chamado "check" que executa o comando node -v e teste sua execução via npm run check.

Comandos:

nano package.json

Adicionar:

"scripts": {
  "check": "node -v"
}

Testar:

npm run check

Exercício 10

Enunciado:
Instale um pacote global ou utilitário via npm ou apt e verifique onde seu binário foi salvo no sistema usando o comando which (ex: which http).

Comandos:

which http

Exemplo:

which jq

Exercício 11

Enunciado:
Efetue uma requisição HTTP GET para a rota http://localhost:3000/scania/info utilizando o comando curl e salve a resposta em um arquivo chamado scania.json.

Comando:

curl -s http://localhost:3000/scania/info > scania.json

Exercício 12

Enunciado:
Efetue a mesma requisição utilizando o httpie (http GET http://localhost:3000/scania/info) e observe a formatação colorida no terminal.

Comando:

http GET http://localhost:3000/scania/info

Exercício 13

Enunciado:
Utilize o utilitário jq para ler o arquivo scania.json e extrair individualmente apenas o valor da chave sistema_telemetria.

Comando:

cat scania.json | jq .sistema_telemetria

Exercício 14

Enunciado:
Adicione uma nova rota /vw/info no arquivo servidor.js que retorne dados da montadora Volkswagen, reinicie o processo do Node e teste a nova rota no terminal.

Comandos:

nano servidor.js

Depois de adicionar a rota, reinicie o servidor e teste:

curl -s http://localhost:3000/vw/info | jq .

Exercício 15

Enunciado:
Crie um script em Bash chamado testar_servidor.sh que executa automaticamente requisições para as três rotas (/status, /scania/info, /vw/info), exibindo o horário de cada teste. Dê permissão de execução (chmod +x testar_servidor.sh) e execute-o no terminal.

Comandos:

nano testar_servidor.sh

chmod +x testar_servidor.sh

./testar_servidor.sh

Aula 03

Exercício 01

Enunciado:
Efetue uma requisição GET para a rota /api/v1/scania via cURL e use o jq para exibir somente a chave modelo.

Comando:

curl -s http://localhost:3001/api/v1/scania | jq .modelo

Exercício 02

Enunciado:
Faça uma requisição para a rota /api/v1/mercedes utilizando a ferramenta httpie e salve o resultado no arquivo mercedes.json.

Comando:

http GET http://localhost:3001/api/v1/mercedes > mercedes.json

Exercício 03

Enunciado:
Utilize o jq para ler o arquivo mercedes.json e filtrar apenas o valor do campo status.

Comando:

cat mercedes.json | jq .status

Exercício 04

Enunciado:
Edite o arquivo telemetria.js e adicione uma nova rota /api/v1/volvo retornando os dados do modelo FH 540. Reinicie a aplicação e teste a rota.

Comandos:

nano telemetria.js

Depois de adicionar a rota, reinicie e teste:

node telemetria.js &

curl -s http://localhost:3001/api/v1/volvo | jq .

Exercício 05

Enunciado:
Configure o arquivo package.json adicionando um script "start": "node telemetria.js". Teste a execução usando npm start.

Comandos:

nano package.json

Adicionar:

"scripts": {
  "start": "node telemetria.js"
}

Testar:

npm start

Exercício 06

Enunciado:
Crie um comando que direcione o resultado da auditoria do script testar_telemetria.sh para um arquivo de log chamado relatorio.log.

Comando:

./testar_telemetria.sh > relatorio.log

Exercício 07

Enunciado:
Filtre a resposta da rota /api/v1/vw para exibir apenas os campos montadora e status em uma única chamada jq.

Comando:

curl -s http://localhost:3001/api/v1/vw | jq '{montadora, status}'

Exercício 08

Enunciado:
Localize o PID do processo Node.js em execução no seu terminal usando ps aux | grep node e encerre-o com o comando kill -9 <PID>.

Comandos:

ps aux | grep node

kill -9 <PID>

Aula 04

Exercício 01

Enunciado:
Efetue uma requisição GET buscando apenas o veículo de ID 1 e exiba o resultado formatado com jq.

Comando:

curl -s http://localhost:3000/api/v1/veiculos/1 | jq .

Exercício 02

Enunciado:
Cadastre um novo caminhão da montadora Volvo (modelo FH 540, placa KLL-9090) enviando uma requisição POST via cURL ou httpie. Verifique se o retorno é o status HTTP 201 Created.

Comando:

curl -i -X POST http://localhost:3000/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540"}'

Exercício 03

Enunciado:
Tente cadastrar um veículo sem passar o campo placa no body da requisição. Confirme se a API retorna o status 400 Bad Request com a mensagem de erro apropriada.

Comando:

curl -i -X POST http://localhost:3000/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"montadora":"Volvo","modelo":"FH 540"}'

Exercício 04

Enunciado:
Faça uma requisição GET filtrando os veículos por query param: http://localhost:3000/api/v1/veiculos?status=DISPONIVEL.

Comando:

curl -s "http://localhost:3000/api/v1/veiculos?status=DISPONIVEL" | jq .

Exercício 05

Enunciado:
Atualize o status do veículo de ID 3 para EM_ROTA utilizando a rota PATCH.

Comando:

curl -s -X PATCH http://localhost:3000/api/v1/veiculos/3/status \
-H "Content-Type: application/json" \
-d '{"status":"EM_ROTA"}' | jq .

Exercício 06

Enunciado:
Tente atualizar ou deletar um veículo com um ID inexistente (ex: ID 99) e valide se o status code retornado é 404 Not Found.

Comandos:

curl -i -X PATCH http://localhost:3000/api/v1/veiculos/99/status \
-H "Content-Type: application/json" \
-d '{"status":"EM_ROTA"}'

curl -i -X DELETE http://localhost:3000/api/v1/veiculos/99

Exercício 07

Enunciado:
Adicione uma nova rota PUT na API (/api/v1/veiculos/:id) que permite substituir todos os dados de um veículo de uma só vez.

Comandos:

nano frota_api.js

Testar a rota:

curl -s -X PUT http://localhost:3000/api/v1/veiculos/1 \
-H "Content-Type: application/json" \
-d '{"placa":"ABC-9999","montadora":"Scania","modelo":"R450","status":"DISPONIVEL"}' | jq .

Exercício 08

Enunciado:
Crie um script Bash chamado teste_crud.sh que executa sequencialmente o cadastro de 2 veículos, atualiza 1 deles e deleta o outro, registrando os logs em crud_result.log.

Comandos:

nano teste_crud.sh

chmod +x teste_crud.sh

./teste_crud.sh > crud_result.log

Aula 05

Exercício 01

Enunciado:
Efetue uma requisição GET na rota de health e verifique nos logs do terminal a mensagem gerada pelo loggerMiddleware.

Comando:

curl -s http://localhost:3000/api/v1/health | jq .

Exercício 02

Enunciado:
Crie um novo arquivo de rota routes/manutencoes.js que gerencia orçamentos de manutenção dos caminhões. Adicione rotas para listar e cadastrar manutenções.

Comando:

nano routes/manutencoes.js

Exercício 03

Enunciado:
Registre o novo roteador de manutenções no arquivo app.js sob o caminho /api/v1/manutencoes, aplicando também o authMiddleware.

Comando:

nano app.js

Exercício 04

Enunciado:
Crie um middleware exclusivo de validação de CNH chamado middlewares/validaCnh.js que garante que a CNH informada no POST contenha exatamente 11 dígitos numéricos.

Comando:

nano middlewares/validaCnh.js

Exercício 05

Enunciado:
Aplique o middleware validaCnh apenas na rota POST de motoristas e faça um teste via cURL enviando uma CNH inválida (ex: "123"). Confirme o retorno 400 Bad Request.

Comandos:

nano routes/motoristas.js

curl -i -X POST http://localhost:3000/api/v1/motoristas \
-H "X-API-KEY: binario-tech-secret-2026" \
-H "Content-Type: application/json" \
-d '{"nome":"João Silva","cnh":"123","categoria":"E"}'

Exercício 06

Enunciado:
Faça uma requisição GET para uma rota inexistente como /api/v1/clientes e confirme que o middleware global de 404 intercepta e responde em JSON padronizado.

Comando:

curl -i http://localhost:3000/api/v1/clientes

Exercício 07

Enunciado:
Crie um script Bash chamado teste_seguranca.sh que simula 3 tentativas de acesso sem chave de API e 1 tentativa com chave válida, salvando os retornos em audit_seguranca.log.

Comandos:

nano teste_seguranca.sh

chmod +x teste_seguranca.sh

./teste_seguranca.sh > audit_seguranca.log

Exercício 08

Enunciado:
Utilize o comando ps aux | grep node no terminal Linux para encontrar o processo da API e encerre-o utilizando kill -9 <PID>.

Comandos:

ps aux | grep node

kill -9 <PID>

Aula 06

Exercício 01

Enunciado:
Efetue uma requisição GET na rota /api/v1/ocorrencias via httpie e valide se a resposta é um array contendo os registros do arquivo ocorrencias.json.

Comando:

http GET http://localhost:3000/api/v1/ocorrencias

Exercício 02

Enunciado:
Utilize o utilitário jq para filtrar do arquivo ocorrencias.json apenas os registros da montadora Scania.

Comando:

cat ocorrencias.json | jq '.[] | select(.montadora == "Scania")'

Exercício 03

Enunciado:
Adicione uma rota GET /api/v1/ocorrencias/montadora/:nome que filtra as ocorrências registradas em arquivo de acordo com a montadora informada na URL.

Comando:

nano ocorrencias_api.js

Testar:

curl -s http://localhost:3000/api/v1/ocorrencias/montadora/Scania | jq .

Exercício 04

Enunciado:
Crie uma nova rota DELETE /api/v1/ocorrencias/:id que remove do arquivo JSON a ocorrência correspondente ao ID informado.

Comando:

nano ocorrencias_api.js

Testar:

curl -s -X DELETE http://localhost:3000/api/v1/ocorrencias/<ID> | jq .

Exercício 05

Enunciado:
Crie um script em Bash chamado limpar_dados.sh que encerra o processo Node.js e exclui o arquivo ocorrencias.json para resetar o ambiente de testes.

Comandos:

nano limpar_dados.sh

chmod +x limpar_dados.sh

./limpar_dados.sh
