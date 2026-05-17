var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

router.get("/kpis/:idUsuario", function (req, res) {
    tentativaController.buscarKPIs(req, res);
});

module.exports = router;