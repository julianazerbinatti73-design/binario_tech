require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const provaRoutes = require('./src/routes/provaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API da Aula 18 funcionando'
  });
});

app.use('/api/v1/prova', provaRoutes);

const PORT = process.env.PORT || 3018;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      'Erro ao conectar ao MongoDB:',
      error
    );
  });
