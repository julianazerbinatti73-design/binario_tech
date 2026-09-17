
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBanco = require('./src/config/database');
const autenticar = require('./src/middlewares/autenticar');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3018;

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
	  res.json({
		      status: 'PRONTO_PARA_EXAME',
		      timestamp: new Date()
		    });
});

app.use('/api/v1/auth', authRoutes);

app.get('/api/v1/simulado/status', autenticar, (req, res) => {
	  res.json({
		      mensagem: 'Acesso autorizado no Servidor Local!',
		      usuario: req.usuario
		    });
});

conectarBanco().then(() => {
	  app.listen(PORT, () => {
		      console.log(`[Binário Tech] Servidor da Aula 17 ativo na porta ${PORT}`);
		    });
});


