var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

router.get("/kpis/:idUsuario", function (req, res) {
    tentativaController.buscarKPIs(req, res);
});

router.get("/precisao-ultimas10/:idUsuario", function (req, res) {
    tentativaController.buscarPrecisaoUltimas10(req, res);
});

router.get("/ranking", function (req, res) {
    tentativaController.buscarRanking(req, res);
});

router.post("/registrar", function (req, res) {
    tentativaController.registrar(req, res);
});

router.get("/usuario/:idUsuario", function (req, res) {
    tentativaController.buscarPorUsuario(req, res);
});

router.get("/ultimas10/:idUsuario", function (req, res) {
    tentativaController.buscarUltimas10(req, res);
});

module.exports = router;