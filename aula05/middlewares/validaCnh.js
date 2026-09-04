module.exports = (req, res, next) => {
  const { cnh } = req.body;

  if (!cnh || !/^\d{11}$/.test(String(cnh))) {
    return res.status(400).json({
      erro: 'A CNH deve conter exatamente 11 dígitos numéricos.'
    });
  }

  next();
};
