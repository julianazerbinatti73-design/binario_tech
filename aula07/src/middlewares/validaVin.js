// src/middlewares/validaVin.js

const validaVin = (req, res, next) => {
  const { vin } = req.body;

  // 1. Verifica se o campo 'vin' foi enviado
  if (!vin) {
    return res.status(400).json({
      sucesso: false,
      erro: 'O campo VIN/Chassis é obrigatório.'
    });
  }

  // 2. Valida se o VIN possui exatamente 12 caracteres (removendo espaços antes/depois)
  if (typeof vin !== 'string' || vin.trim().length !== 12) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Validação falhou: O VIN/Chassis deve ter exatamente 12 caracteres.'
    });
  }

  // Se passou na validação, avança para o próximo middleware/controller
  next();
};

module.exports = validaVin;
