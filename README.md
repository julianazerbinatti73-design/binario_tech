Exercicio 01:
Efetue uma requisicao GET na rota de &#39;health&#39; e verifique nos logs do terminal a mensagem
gerada pelo &#39;loggerMiddleware&#39;.
node app.js
curl -s http://localhost:3017/api/v1/health | jq .

Exercicio 02:
Crie um novo arquivo de rota &#39;routes/manutencoes.js&#39; que gerencia orcaments de manutencao
dos caminhões. Adicione rotas para listar e cadastrar manutencoes.
Criamos o arquivo routes/manutencoes.js

Exercicio 03:
Registre o novo roteador de manutencoes no arquivo &#39;app.js&#39; sob o caminho
&#39;/api/v1/manutencoes&#39;, aplicando tambem o &#39;authMiddleware&#39;.
node app.js
curl -s http://localhost:3017/api/v1/manutencoes | jq .

Exercicio 04:
Crie um middleware exclusivo de validacao de CNH chamado &#39;middlewares/validaCnh.js&#39; que
garante que a CNH informada no POST contenha exatamente 11 digitos numericos.
vi middlewares/validaCnh.js

Exercicio 05:
Aplique o middleware &#39;validaCnh&#39; apenas na rota POST de motoristas e faca um teste via cURL
enviando uma CNH invalida (ex: &quot;123&quot;). Confirme o retorno 400 Bad Request.

node app.js
curl -i -s -X POST http://localhost:3017/api/v1/motoristas -H &quot;X-API-KEY: binario-tech-secret-
2026&quot; -H &quot;Content-Type: application/json&quot; -d &#39;{&quot;nome&quot;:&quot;Roberto Souza&quot;,&quot;cnh&quot;:&quot;123&quot;,&quot;categoria&quot;:&quot;E&quot;}&#39;

Exercicio 06:
Faca uma requisicao GET para uma rota inexistente como &#39;/api/v1/clientes&#39; e confirme que o
middleware global de 404 intercepta e responde em JSON padronizado.

node app.js
curl -i -s http://localhost:3017/api/v1/clientes

Exercicio 07:
Crie um script Bash chamado &#39;teste_seguranca.sh&#39; que simula 3 tentativas de acesso sem chave
de API e 1 tentativa com chave valida, salvando os retornos em &#39;audit_seguranca.log&#39;.
vi teste_seguranca.sh
chmod +x teste_seguranca.sh
./teste_seguranca.sh
cat audit_seguranca.log

Exercicio 08:
Utilize o comando &#39;ps aux | grep node&#39; no terminal Linux para encontrar o processo da API e
encerre-o utilizando &#39;kill -9 &lt;PID&gt;&#39;.
fuser -k 3017/tcp

OPCAO 2---------------------------------------------------------------------------------------------------------------------------
mkdir -p ~/binario_tech/prova_aula05/middlewares ~/binario_tech/prova_aula05/routes && cd ~/binario_tech/prova_aula05 && npm init -y && npm install express cors && cat << 'EOF' > middlewares/loggerMiddleware.js
const loggerMiddleware = (req, res, next) => {
  const inicio = new Date().toISOString();
  res.on('finish', () => {
    console.log(`[LOG] ${req.method} ${req.originalUrl} - ${inicio}`);
  });
  next();
};

module.exports = loggerMiddleware;
EOF
cat << 'EOF' > middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== 'binario-tech-secret-2026') {
    return res.status(401).json({ erro: 'Não autorizado: Chave de API inválida ou ausente.' });
  }

  next();
};

module.exports = authMiddleware;
EOF
cat << 'EOF' > middlewares/validaCnh.js
function validaCnh(req, res, next) {
  const { cnh } = req.body;
  const regexCnh = /^\d{11}$/;

  if (!cnh || !regexCnh.test(cnh)) {
    return res.status(400).json({
      erro: 'CNH invalida. A CNH deve conter exatamente 11 digitos numericos.'
    });
  }

  next();
}

module.exports = validaCnh;
EOF
cat << 'EOF' > routes/manutencoes.js
const express = require('express');
const router = express.Router();

const manutencoes = [
  { id: 1, caminhaoId: 1, descricao: 'Troca de oleo', valor: 850.00 }
];

router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});

router.post('/', (req, res) => {
  const { caminhaoId, descricao, valor } = req.body;

  if (!caminhaoId || !descricao || !valor) {
    return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    caminhaoId,
    descricao,
    valor
  };

  manutencoes.push(novaManutencao);
  res.status(201).json(novaManutencao);
});

module.exports = router;
EOF
cat << 'EOF' > routes/motoristas.js
const express = require('express');
const router = express.Router();
const validaCnh = require('../middlewares/validaCnh');

const motoristas = [];

router.get('/', (req, res) => {
  res.status(200).json(motoristas);
});

router.post('/', validaCnh, (req, res) => {
  const { nome, cnh } = req.body;
  const novoMotorista = { id: motoristas.length + 1, nome, cnh };
  motoristas.push(novoMotorista);

  res.status(201).json({ mensagem: 'Motorista cadastrado com sucesso!', motorista: novoMotorista });
});

module.exports = router;
EOF
cat << 'EOF' > app.js
const express = require('express');
const cors = require('cors');

const loggerMiddleware = require('./middlewares/loggerMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();
const PORT = 2018;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);
app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota nao encontrada',
    caminho: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
EOF
cat << 'EOF' > teste_seguranca.sh
#!/bin/bash

API_URL="http://localhost:2018/api/v1"
CHAVE_VALIDA="binario-tech-secret-2026"

echo "=== INICIANDO AUDITORIA DE SEGURANCA ==="
date

echo -e "\n--- Teste 1: Acesso Não Autorizado (401) ---"
curl -i -s "$API_URL/motoristas"

echo -e "\n--- Teste 2: Erro de Validação de CNH (400) ---"
curl -i -s -X POST "$API_URL/motoristas" \
  -H "X-API-KEY: $CHAVE_VALIDA" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Carlos Silva", "cnh": "123"}'

echo -e "\n--- Teste 3: Rota Inexistente (404) ---"
curl -i -s "$API_URL/clientes"

echo -e "\n--- Teste 4: Cadastro Bem-Sucedido com Chave Válida (201) ---"
curl -i -s -X POST "$API_URL/motoristas" \
  -H "X-API-KEY: $CHAVE_VALIDA" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Carlos Silva", "cnh": "12345678901"}'

echo -e "\n--- Teste 5: Consulta Bem-Sucedida com Chave Válida (200) ---"
curl -i -s -H "X-API-KEY: $CHAVE_VALIDA" "$API_URL/motoristas"

echo -e "\n=== AUDITORIA FINALIZADA ==="
EOF
chmod +x teste_seguranca.sh
