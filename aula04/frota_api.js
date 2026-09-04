const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let veiculos = [
    { id: 1, placa: "ABC-1234", montadora: "Scania", modelo: "R450", status: "DISPONIVEL" },
    { id: 2, placa: "XYZ-9876", montadora: "Mercedez-Benz", modelo: "Actros", status: "EM_ROTA" }
];

// GET - Listar veículos com filtro por status
app.get('/api/v1/veiculos', (req, res) => {
    const { status } = req.query;

    if (status) {
        const filtrados = veiculos.filter(
            v => v.status.toUpperCase() === status.toUpperCase()
        );

        return res.status(200).json(filtrados);
    }

    res.status(200).json(veiculos);
});

// GET - Buscar veículo por ID
app.get('/api/v1/veiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado na base de dados."
        });
    }

    res.status(200).json(veiculo);
});

// POST - Criar veículo
app.post('/api/v1/veiculos', (req, res) => {
    const { placa, montadora, modelo } = req.body;

    if (!placa || !montadora || !modelo) {
        return res.status(400).json({
            erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."
        });
    }

    const novoVeiculo = {
        id: veiculos.length + 1,
        placa,
        montadora,
        modelo,
        status: "DISPONIVEL"
    };

    veiculos.push(novoVeiculo);

    res.status(201).json(novoVeiculo);
});

// PATCH - Atualizar somente o status
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    if (!status) {
        return res.status(400).json({
            erro: "O campo 'status' e obrigatorio."
        });
    }

    veiculo.status = status.toUpperCase();

    res.status(200).json({
        mensagem: "Status atualizado com sucesso!",
        veiculo
    });
});

// PUT - Substituir todos os dados do veículo
app.put('/api/v1/veiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const { placa, montadora, modelo, status } = req.body;

    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    if (!placa || !montadora || !modelo || !status) {
        return res.status(400).json({
            erro: "Campos 'placa', 'montadora', 'modelo' e 'status' sao obrigatorios."
        });
    }

    veiculo.placa = placa;
    veiculo.montadora = montadora;
    veiculo.modelo = modelo;
    veiculo.status = status.toUpperCase();

    res.status(200).json({
        mensagem: "Veiculo atualizado com sucesso!",
        veiculo
    });
});

// DELETE - Remover veículo
app.delete('/api/v1/veiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = veiculos.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    veiculos.splice(index, 1);

    res.status(200).json({
        mensagem: `Veiculo ID ${id} removido com sucesso.`
    });
});

app.listen(PORT, () => {
    console.log(`[Binario Tech] API de frotas rodando em http://localhost:${PORT}`);
});
