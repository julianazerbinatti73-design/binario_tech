const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, senha } = req.body;

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

    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        return res.status(201).json({
            mensagem: 'Usuário registrado com sucesso!',
            usuario: {
                email,
                senha: senhaHash
            }
        });
    } catch (error) {
        return res.status(500).json({
            erro: 'Erro interno ao registrar usuário.'
        });
    }
};

module.exports = {
    register
};
