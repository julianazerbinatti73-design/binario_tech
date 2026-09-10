const verificarJson = (req, res, next) => {
    if (req.method === 'POST') {
        if (!req.is('application/json')) {
            return res.status(400).json({
                status: 'ERRO',
                mensagem: 'O Content-Type deve ser application/json.'
            });
        }
    }

    next();
};

module.exports = verificarJson;
