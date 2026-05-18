let tentativaModel = require("../models/tentativaModel");

function buscarKPIs(req, res) {
    let idUsuario = req.params.idUsuario;

    tentativaModel.buscarKPIs(idUsuario).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function buscarPrecisaoUltimas10(req, res) {
    let idUsuario = req.params.idUsuario;

    tentativaModel.buscarPrecisaoUltimas10(idUsuario).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function buscarRanking(req, res) {
    tentativaModel.buscarRanking().then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function registrar(req, res) {
    let fkUsuario = req.body.fkUsuario;
    let dificuldade = req.body.dificuldade;
    let acertos = req.body.acertos;
    let erros = req.body.erros;
    let playerPoints = req.body.playerPoints;

    if (fkUsuario == undefined) {
        res.status(400).send("fkUsuario está undefined!");
    } else if (dificuldade == undefined) {
        res.status(400).send("dificuldade está undefined!");
    } else if (acertos == undefined) {
        res.status(400).send("acertos está undefined!");
    } else if (erros == undefined) {
        res.status(400).send("erros está undefined!");
    } else if (playerPoints == undefined) {
        res.status(400).send("playerPoints está undefined!");
    } else {
        tentativaModel.registrar(fkUsuario, dificuldade, acertos, erros, playerPoints)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao registrar a tentativa! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarKPIs,
    buscarPrecisaoUltimas10,
    buscarRanking,
    registrar
}
