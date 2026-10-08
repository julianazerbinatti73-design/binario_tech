const express = require('express');
const app = express();
const PORT = 3018;

app.use(express.json());

// --- ROTAS DA API v1 ---

app.get('/api/v1/scania', (req, res) => {
            res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82 });
});

app.get('/api/v1/mercedes', (req, res) => {
            res.json({ montadora: "Mercedes-Benz", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 78 });
});

app.get('/api/v1/vw', (req, res) => {
            res.json({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

app.get('/api/v1/volvo', (req, res) => {
            res.json({ montadora: "Volvo", modelo: "FH 540", status: "OK", conexao: false, velocidade_media: 0 });
});


// --- ROTAS NOVAS (/info e /status) ---


app.get('/status', (req, res) => {
            res.json({ status: "OK" });
});

app.get('/scania/info', (req, res) => {
            res.json({ montadora: "Scania", status: "OK", sistema_telemetria: "Ativo" });
});

app.get('/vw/info', (req, res) => {
            res.json({ montadora: "Volkswagen", status: "OK", sistema_telemetria: "Ativo" });
});

app.get('/mercedes/info', (req, res) => {
            res.json({ montadora: "Mercedes-Benz", status: "OK", sistema_telemetria: "Ativo" });
});

app.get('/volvo/info', (req, res) => {
            res.json({ montadora: "Volvo", status: "OK", sistema_telemetria: "Ativo" });
});

app.listen(PORT, () => {
            console.log(`[Binario Tech] Servidor de Telemetria rodando em http://localhost:${PORT}`);
});
