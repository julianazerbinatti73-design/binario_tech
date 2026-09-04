const express = require('express');

const router = express.Router();

// Listar manutenções
router.get('/', (req, res) => {
  res.json([]);
});

// Cadastrar manutenção
router.post('/', (req, res) => {
  const { caminhaoId, descricao, valor } = req.body;

  res.status(201).json({
    caminhaoId,
    descricao,
    valor
  });
});

module.exports = router;
