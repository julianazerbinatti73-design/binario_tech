const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    senha: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

const registrar = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(409).json({
        erro: 'E-mail já cadastrado'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      usuario: {
        id: usuario._id,
        email: usuario.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno do servidor'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        erro: 'Credenciais inválidas'
      });
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: 'Credenciais inválidas'
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id.toString(),
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m'
      }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      token
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno do servidor'
    });
  }
};

const relatorio = async (req, res) => {
  return res.status(200).json({
    mensagem: 'Relatório acessado com sucesso',
    usuario: req.usuario,
    dados: {
      status: 'autorizado'
    }
  });
};

module.exports = {
  registrar,
  login,
  relatorio
};
