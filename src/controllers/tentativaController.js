var tentativaModel = require("../models/tentativaModel");

function buscarKPIs(req, res) {
    var idUsuario = req.params.idUsuario;

    tentativaModel.buscarKPIs(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarKPIs,
}
