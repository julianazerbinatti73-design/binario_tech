const express = require('express');
const cors = require('cors');

// 1. Importação das rotas
const scaniaRoutes = require('./src/routes/scaniaRoutes');
const mercedesRoutes = require('./src/routes/mercedesRoutes'); // <-- Adicionado!

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware de log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
  next();
});

// 2. Registro das rotas da API
app.use('/api/v1/telemetria/scania', scaniaRoutes);
app.use('/api/v1/telemetria/mercedes', mercedesRoutes); // <-- Adicionado!

// Middleware para rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ erro: "Módulo ou rota de telemetria não encontrada." });
});

// Middleware de tratamento de erros internos (500)
app.use((err, req, res, next) => {
  console.error(`[Erro]: ${err.message}`);
  res.status(500).json({ erro: "Erro interno no servidor." });
});

app.listen(PORT, () => {
  console.log(`[Binário Tech] Servidor Modularizado Ativo na Porta ${PORT}`);
});
