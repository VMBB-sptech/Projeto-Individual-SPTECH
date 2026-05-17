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

function buscarPrecisaoUltimas10(idUsuario) {
    console.log("ACESSEI O TENTATIVA MODEL - function buscarPrecisaoUltimas10():", idUsuario);
    var instrucaoSql = `
        SELECT AVG(precisao) as precisaoMedia FROM (
            SELECT (acertos / (acertos + erros)) * 100 as precisao
            FROM tentativa 
            WHERE fkUsuario = ${idUsuario}
            ORDER BY data_hora DESC
            LIMIT 10
        ) as ultimas;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRanking() {
    console.log("ACESSEI O TENTATIVA MODEL - function buscarRanking()");
    var instrucaoSql = `
        SELECT u.nome, t.dificuldade, t.acertos, t.erros, t.playerPoints, t.data_hora
        FROM tentativa t
        JOIN usuario u ON t.fkUsuario = u.id
        ORDER BY t.playerPoints DESC
        LIMIT 50;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKPIs,
    buscarPrecisaoUltimas10,
    buscarRanking
};