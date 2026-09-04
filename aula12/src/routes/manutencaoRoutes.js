
const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');

router.post('/', manutencaoController.criar);
router.get('/placa/:placa', manutencaoController.buscarPorPlaca);
router.post('/:id/pecas', manutencaoController.adicionarPeca);
router.get('/', manutencaoController.listarComFiltros);
router.patch('/:id/status', manutencaoController.atualizarStatus);
router.delete('/:id', manutencaoController.excluir);

module.exports = router;
