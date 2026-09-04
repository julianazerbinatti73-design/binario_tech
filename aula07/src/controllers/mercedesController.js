// src/controllers/mercedesController.js

// Simulação de banco de dados
const frota = [
  { id: 1, modelo: 'Actros 2653', tipo: 'Extrapesado', status: 'Em rota', nivelCombustivel: '85%' },
  { id: 2, modelo: 'Atego 1719', tipo: 'Médio', status: 'Em manutenção', nivelCombustivel: '40%' }
];

// Controller para listar todos os veículos
exports.getFrota = (req, res) => {
  res.status(200).json({
    sucesso: true,
    total: frota.length,
    dados: frota
  });
};

// Controller para buscar um veículo pelo ID
exports.getCaminhaoPorId = (req, res) => {
  const { id } = req.params;
  const caminhao = frota.find(item => item.id === parseInt(id));

  if (!caminhao) {
    return res.status(404).json({
      sucesso: false,
      mensagem: 'Caminhão não encontrado.'
    });
  }

  res.status(200).json({
    sucesso: true,
    dados: caminhao
  });
};

// NOVA FUNÇÃO: Adicionada para corrigir o erro de rota
exports.criarCaminhao = (req, res) => {
  const { modelo, tipo, vin } = req.body;

  // Validação simples
  if (!modelo || !tipo || !vin) {
    return res.status(400).json({ sucesso: false, erro: "Campos 'modelo', 'tipo' e 'vin' são obrigatórios." });
  }

  const novoCaminhao = {
    id: frota.length + 1,
    modelo,
    tipo,
    status: 'Ativo',
    nivelCombustivel: '100%'
  };

  frota.push(novoCaminhao);
  
  res.status(201).json({
    sucesso: true,
    dados: novoCaminhao
  });
};
