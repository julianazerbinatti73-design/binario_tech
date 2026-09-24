require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3018;

app.use(express.json());

// ROTA DE STATUS DO SERVICO

app.get('/api/v1/telemetria/status', (req, res) => {
	res.json({
		servico: "Servico de Telemetria Binario Tech",
		status: "OPERACIONAL",
		uptime: process.uptime(),
		pid: process.pid,
		timestamp: new Date()
	});
});

//ROTA PARA SIMULAR A FALHA CRITICA / CRASH DA APLICACAO

app.get('/api/v1/telemetria/crash', (req, res) => {
	console.error(`[ALERTA] Falha critica simulada pelo PID ${process.pid}`);
	res.status(500).json({ mensagem: "Simulando falha grave no processo"});
	setTimeout(() => {
		process.exit(1);
	}, 1000);

	app.listen(PORT, () => {
		console.log(`[Binario Tech] Microservico ativo na porta ${PORT} (PID: ${process.pid})`);
	});
