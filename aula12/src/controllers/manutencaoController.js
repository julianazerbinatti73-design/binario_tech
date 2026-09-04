const Manutencao = require('../models/Manutencao');

const manutencaoController = {
	    criar: async (req, res) => {
		            try {
				                const novaManutencao = await Manutencao.create(req.body);

				                res.status(201).json(novaManutencao);
				            } catch (erro) {
						                res.status(400).json({
									                erro: "Erro ao registrar manutencao",
									                detalhe: erro.message
									            });
						            }
		        },

	    buscarPorPlaca: async (req, res) => {
		            try {
				                const { placa } = req.params;

				                const manutencoes = await Manutencao.find({
							                veiculoPlaca: {
										                    $regex: placa,
										                    $options: 'i'
										                }
							            });

				                res.status(200).json(manutencoes);
				            } catch (erro) {
						                res.status(500).json({
									                erro: "Erro ao buscar manutencoes pela placa."
									            });
						            }
		        },

	    adicionarPeca: async (req, res) => {
		            try {
				                const { id } = req.params;
				                const { nomePeca, quantidade, custoUnitario } = req.body;

				                if (custoUnitario < 0) {
							                return res.status(400).json({
										                    erro: "O custoUnitario nao pode ser negativo."
										                });
							            }

				                const manutencaoAtualizada = await Manutencao.findByIdAndUpdate(
							                id,
							                {
										                    $push: {
													                            pecasSubstituidas: {
																	                                nomePeca,
																	                                quantidade,
																	                                custoUnitario
																	                            }
													                        }
										                },
							                {
										                    new: true,
										                    runValidators: true
										                }
							            );

				                if (!manutencaoAtualizada) {
							                return res.status(404).json({
										                    erro: "Manutencao nao encontrada."
										                });
							            }

				                res.status(200).json(manutencaoAtualizada);
				            } catch (erro) {
						                res.status(400).json({
									                erro: "Erro ao adicionar peca.",
									                detalhe: erro.message
									            });
						            }
		        },

	    listarComFiltros: async (req, res) => {
		            try {
				                const { minCusto, status } = req.query;
				                let query = {};

				                if (minCusto) {
							                query.custoTotal = {
										                    $gte: Number(minCusto)
										                };
							            }

				                if (status) {
							                query.status = status;
							            }

				                const resultados = await Manutencao
				                    .find(query)
				                    .sort({ createdAt: -1 });

				                res.status(200).json(resultados);
				            } catch (erro) {
						                res.status(500).json({
									                erro: "Erro ao consultar manutencoes."
									            });
						            }
		        },

	    atualizarStatus: async (req, res) => {
		            try {
				                const { id } = req.params;
				                const { status } = req.body;

				                const atualizado = await Manutencao.findByIdAndUpdate(
							                id,
							                { status },
							                {
										                    new: true,
										                    runValidators: true
										                }
							            );

				                if (!atualizado) {
							                return res.status(404).json({
										                    erro: "Registro de manutencao nao encontrado."
										                });
							            }

				                res.status(200).json(atualizado);
				            } catch (erro) {
						                res.status(400).json({
									                erro: "Erro ao consultar registro.",
									                detalhe: erro.message
									            });
						            }
		        },

	    excluir: async (req, res) => {
		            try {
				                const { id } = req.params;

				                const removido = await Manutencao.findByIdAndDelete(id);

				                if (!removido) {
							                return res.status(404).json({
										                    erro: "Registro nao encontrado para exclusao."
										                });
							            }

				                res.status(200).json({
							                mensagem: "Registro de manutencao excluido com sucesso!"
							            });
				            } catch (erro) {
						                res.status(500).json({
									                erro: "Erro ao excluir registro."
									            });
						            }
		        }
};

module.exports = manutencaoController;
