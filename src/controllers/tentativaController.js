var tentativaModel = require("../models/tentativaModel");

function buscarKPIs(req, res) {
    var idUsuario = req.params.idUsuario;

    tentativaModel.buscarKPIs(idUsuario).then(
        function (resultado) {
            res.json(resultado);
        }
    ) .catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function buscarPrecisaoUltimas10(req, res) {
    var idUsuario = req.params.idUsuario;

    tentativaModel.buscarPrecisaoUltimas10(idUsuario).then(
        function (resultado) {
            res.json(resultado);
        }
    ) .catch(
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
    ) .catch(
        function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    buscarKPIs,
    buscarPrecisaoUltimas10,
    buscarRanking
}
