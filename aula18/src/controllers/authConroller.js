const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarios = [];

const authController = {
    register: async (req, res) => {
        const { email, senha, perfil } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: 'Email e senha são obrigatórios.'
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                erro: 'A senha deve ter no mínimo 6 caracteres.'
            });
        }

        const usuarioExistente = usuarios.find(usuario => usuario.email === email);

        if (usuarioExistente) {
            return res.status(409).json({
                erro: 'Usuário já cadastrado.'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        usuarios.push({
            email,
            senha: senhaHash,
            perfil: perfil || 'USER'
        });

        return res.status(201).json({
            mensagem: 'Usuário registrado com sucesso!'
        });
    },

    login: async (req, res) => {
        const { email, senha } = req.body;

        const usuario = usuarios.find(usuario => usuario.email === email);

        if (!usuario) {
            return res.status(401).json({
                erro: 'Email ou senha inválidos.'
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                erro: 'Email ou senha inválidos.'
            });
        }

        const token = jwt.sign(
            {
                email: usuario.email,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET || 'segredo-aula18',
            {
                expiresIn: '30m'
            }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token
        });
    },

    perfil: (req, res) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                erro: 'Token não fornecido.'
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'segredo-aula18'
            );

            return res.status(200).json({
                mensagem: 'Acesso autorizado no Servidor Local!',
                usuario: decoded
            });
        } catch (error) {
            return res.status(401).json({
                erro: 'Token inválido ou expirado.'
            });
        }
    }
};

module.exports = authController;
