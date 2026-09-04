
const db = require('../database/connection');

const telemetriaController = {
	  registrarLeitura: async (req, res) => {
		      try {
			            const { veiculo_id, velocidade, temperatura_motor } = req.body;

			            if (
					            !veiculo_id ||
					            velocidade === undefined ||
					            temperatura_motor === undefined
					          ) {
					            return res.status(400).json({
							              erro: "Campos 'veiculo_id', 'velocidade' e 'temperatura_motor' são obrigatórios."
							            });
					          }

			            const veiculoExiste = await db('veiculos')
			              .where({ id: veiculo_id })
			              .first();

			            if (!veiculoExiste) {
					            return res.status(404).json({
							              erro: "Veículo informado não existe no banco de dados."
							            });
					          }

			            const [id] = await db('telemetria').insert({
					            veiculo_id,
					            velocidade,
					            temperatura_motor
					          });

			            return res.status(201).json({
					            id,
					            veiculo_id,
					            velocidade,
					            temperatura_motor,
					            mensagem: "Leitura registrada com sucesso!"
					          });
			          } catch (erro) {
					        console.error('ERRO AO REGISTRAR TELEMETRIA:', erro);

					        return res.status(500).json({
							        erro: "Erro ao registrar telemetria no banco de dados."
							      });
					      }
		    },

	  listarRelatorioCompleto: async (req, res) => {
		      try {
			            const { alerta } = req.query;

			            const query = db('telemetria')
			              .join(
					                'veiculos',
					                'veiculos.id',
					                '=',
					                'telemetria.veiculo_id'
					              )
			              .select(
					                'telemetria.id as telemetria_id',
					                'veiculos.placa',
					                'veiculos.montadora',
					                'veiculos.modelo',
					                'telemetria.velocidade',
					                'telemetria.temperatura_motor',
					                'telemetria.capturado_em'
					              );

			            if (alerta === 'true') {
					            query.where(
							              'telemetria.temperatura_motor',
							              '>',
							              95
							            );
					          }

			            const relatorio = await query;

			            return res.status(200).json(relatorio);
			          } catch (erro) {
					        console.error('ERRO AO GERAR RELATÓRIO:', erro);

					        return res.status(500).json({
							        erro: "Erro ao gerar relatório com Inner Join."
							      });
					      }
		    },

	  buscarPorVeiculo: async (req, res) => {
		      try {
			            const { id } = req.params;

			            const leituras = await db('telemetria')
			              .join(
					                'veiculos',
					                'veiculos.id',
					                '=',
					                'telemetria.veiculo_id'
					              )
			              .where('telemetria.veiculo_id', id)
			              .select(
					                'telemetria.id as telemetria_id',
					                'veiculos.placa',
					                'veiculos.montadora',
					                'veiculos.modelo',
					                'telemetria.velocidade',
					                'telemetria.temperatura_motor',
					                'telemetria.capturado_em'
					              );

			            return res.status(200).json(leituras);
			          } catch (erro) {
					        console.error('ERRO AO BUSCAR LEITURAS:', erro);

					        return res.status(500).json({
							        erro: "Erro ao buscar leituras do veículo."
							      });
					      }
		    }
};

module.exports = telemetriaController;

