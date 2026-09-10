const express = require('express');
const cors = require('cors');
const veiculoRoutes = require('./src/routes/veiculoRoutes');
const gerenciadorErros = require('./src/middlewares/gerenciadorErros');
const verificarJson = require('./src/middlewares/verificarJson');

const app = express();
const PORT = 3018;

app.use(cors());
app.use(verificarJson);
app.use(express.json());

app.use('/api/v1/veiculos', veiculoRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: "NAO_ENCONTRADO",
        mensagem: "Endpoint nao encontrado na API."
    });
});

app.use(gerenciadorErros);

app.listen(PORT, () => {
    console.log(`[Binario Tech] Servidor de Validacoes Aula 13 ativo na porta ${PORT}`);
});
