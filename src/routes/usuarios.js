var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebe os dados do html e direciona para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;