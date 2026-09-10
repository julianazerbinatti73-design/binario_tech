const veiculoController = {
    cadastrar: (req, res, next) => {
        try {
            let { placa, chassi, capacidadeCargaKg } = req.body;

            placa = placa.toUpperCase();

            if (chassi === "ERRO_SIMULADO_500") {
                throw new Error("Falha crítica no processamento interno do servidor!");
            }

            res.status(201).json({
                mensagem: "Veículo cadastrado com sucesso e dados validados!",
                veiculo: {
                    placa,
                    chassi,
                    capacidadeCargaKg,
                    registradoEm: new Date()
                }
            });
        } catch (erro) {
            next(erro);
        }
    }
};

module.exports = veiculoController;
