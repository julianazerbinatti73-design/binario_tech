// src/routes/scaniaRoutes.js
const express = require('express');
const router = express.Router();
const scaniaController = require('../controllers/scaniaController');

// Importa o middleware de validação do VIN
const validaVin = require('../middlewares/validaVin');

// Rota POST da Scania protegida pelo middleware validaVin
router.post('/', validaVin, scaniaController.criarTelemetria);

module.exports = router;
