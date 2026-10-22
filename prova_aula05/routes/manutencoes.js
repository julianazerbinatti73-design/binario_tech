const express = require('express');
const router = express.Router();


let manutencoes = [
    {
        id: 1,
        caminhao: "Caminhao 01",
        descricao: "Troca de oleo e filtros",
        valor: 850.00,
        status: "ORCAMENTO"
    },
    {
        id: 2,
        caminhao: "Caminhao 02",
        descricao: "Revisao do sistema de freios",
        valor: 1200.00,
        status: "ORCAMENTO"
    }
];


// GET /api/v1/manutencoes
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});


// POST /api/v1/manutencoes
router.post('/', (req, res) => {
    const { caminhao, descricao, valor } = req.body;


    if (!caminhao || !descricao || !valor) {
        return res.status(400).json({
            erro: "Campos 'caminhao', 'descricao' e 'valor' sao obrigatorios."
        });
    }


    const novaManutencao = {
        id: manutencoes.length + 1,
        caminhao,
        descricao,
        valor,
        status: "ORCAMENTO"
    };


    manutencoes.push(novaManutencao);
    res.status(201).json(novaManutencao);
});


module.exports = router;
