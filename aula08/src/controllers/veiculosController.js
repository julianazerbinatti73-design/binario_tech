
const db = require('../database/connection');

const veiculosController = {
	    listarTodos: async (req, res) => {
		            try {
				                const veiculos = await db('veiculos').select('*');

				                return res.status(200).json(veiculos);
				            } catch (erro) {
						                return res.status(500).json({
									                erro: "Erro ao consultar banco de dados.",
									                detalhe: erro.message
									            });
						            }
		        },

	    criar: async (req, res) => {
		            try {
				                const { placa, montadora, modelo } = req.body;

				                if (!placa || !montadora || !modelo) {
							                return res.status(400).json({
										                    erro: "Campos 'placa', 'montadora' e 'modelo' são obrigatórios."
										                });
							            }

				                const [id] = await db('veiculos').insert({
							                placa,
							                montadora,
							                modelo
							            });

				                const novoVeiculo = await db('veiculos')
				                    .where('id', id)
				                    .first();

				                return res.status(201).json(novoVeiculo);

				            } catch (erro) {
						                if (erro.message.includes('UNIQUE constraint failed')) {
									                return res.status(409).json({
												                    erro: "Já existe um veículo cadastrado com essa placa"
												                });
									            }

						                return res.status(500).json({
									                erro: "Erro ao inserir veículo no banco de dados.",
									                detalhe: erro.message
									            });
						            }
		        },

	    buscarPorId: async (req, res) => {
		            try {
				                const { id } = req.params;

				                const veiculo = await db('veiculos')
				                    .where({ id })
				                    .first();

				                if (!veiculo) {
							                return res.status(404).json({
										                    erro: "Veículo não encontrado"
										                });
							            }

				                return res.status(200).json(veiculo);

				            } catch (erro) {
						                return res.status(500).json({
									                erro: "Erro ao consultar banco de dados.",
									                detalhe: erro.message
									            });
						            }
		        },

	    atualizarStatus: async (req, res) => {
		            try {
				                const { id } = req.params;
				                const { status } = req.body;

				                if (!status) {
							                return res.status(400).json({
										                    erro: "O campo 'status' é obrigatório."
										                });
							            }

				                const atualizado = await db('veiculos')
				                    .where({ id })
				                    .update({ status });

				                if (!atualizado) {
							                return res.status(404).json({
										                    erro: "Veículo não encontrado"
										                });
							            }

				                const veiculo = await db('veiculos')
				                    .where({ id })
				                    .first();

				                return res.status(200).json(veiculo);

				            } catch (erro) {
						                return res.status(500).json({
									                erro: "Erro ao atualizar status do veículo.",
									                detalhe: erro.message
									            });
						            }
		        }
};

module.exports = veiculosController;
