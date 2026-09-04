// src/routes/mercedesRoutes.js
const express = require('express');
const router = express.Router();
const mercedesController = require('../controllers/mercedesController');

// 1. Importa o middleware de validação do VIN
const validaVin = require('../middlewares/validaVin');

// Rotas existentes (GET)
router.get('/', mercedesController.getFrota);
router.get('/:id', mercedesController.getCaminhaoPorId);

// 2. Rota POST utilizando o middleware 'validaVin' antes do controller
router.post('/', validaVin, mercedesController.criarCaminhao);

module.exports = router;
