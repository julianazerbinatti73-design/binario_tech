const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/token-teste', (req, res) => {
  const token = jwt.sign(
    {
      tipo: 'token-teste'
    },
    process.env.JWT_SECRET || 'segredo-teste-aula17',
    {
      expiresIn: '5m'
    }
  );

  res.status(200).json({
    token
  });
});

module.exports = router;
