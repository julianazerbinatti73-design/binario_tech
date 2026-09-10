const { body } = require('express-validator');

const regrasCadastroVeiculo = [
    body('placa')
        .notEmpty()
        .withMessage('A placa é obrigatória.')
        .toUpperCase(),

    body('chassi')
        .notEmpty()
        .withMessage('O chassi é obrigatório.'),

    body('capacidadeCargaKg')
        .isNumeric()
        .withMessage('A capacidade de carga deve ser numérica.'),

    body('anoFabricacao')
        .optional()
        .isInt({ min: 2000, max: new Date().getFullYear() })
        .withMessage(`O ano de fabricação deve ser um número inteiro entre 2000 e ${new Date().getFullYear()}.`)
];

module.exports = { regrasCadastroVeiculo };
