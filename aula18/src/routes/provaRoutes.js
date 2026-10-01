const express = require('express');
const { body, validationResult } = require('express-validator');

const {
  registrar,
  login,
  relatorio
} = require('../controllers/provaController');

const validarJWT = require('../middlewares/validarJWT');

const router = express.Router();

const validarDados = (req, res, next) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      detalhes: erros.array()
    });
  }

  next();
};

router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('E-mail inválido'),

    body('senha')
      .isLength({ min: 6 })
      .withMessage('A senha deve ter no mínimo 6 caracteres')
  ],
  validarDados,
  registrar
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('E-mail inválido'),

    body('senha')
      .notEmpty()
      .withMessage('A senha é obrigatória')
  ],
  validarDados,
  login
);

router.get(
  '/relatorio',
  validarJWT,
  relatorio
);

module.exports = router;
