var database = require("../database/config")

function buscarKPIs(idUsuario) {
    console.log("ACESSEI O TENTATIVA MODEL - function buscarKPIs():", idUsuario);
    var instrucaoSql = `
        SELECT 
            SUM(acertos) as totalAcertos,
            SUM(erros) as totalErros,
            COUNT(*) as totalTentativas,
            SUM(playerPoints) as totalPP
        FROM tentativa WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKPIs,
};