const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const motoristasRouter = require('./routes/motoristas');
const manutencoesRoutes = require('./routes/manutencoes');

const app = express();
const PORT = 3000;

// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Rota Publica
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: "ONLINE", aplicacao: "Binario Tech API v2" });
});

// Rotas protegidas por autenticacao
app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);

// Manutencoes (rota)
app.use('/api/v1/manutencoes', authMiddleware, manutencoesRoutes);

// Caso nao encontre a rota
app.use((req, res) => {
    res.status(404).json({ erro: "Endpoint nao encontrado no servidor binario tech." });
});

app.listen(PORT, () => {
    console.log(`[Binario Tech] Servidor de Middlewares ativo na porta ${PORT}`);
});
