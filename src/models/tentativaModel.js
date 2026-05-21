var database = require("../database/config")

function buscarKPIs(idUsuario) {
    console.log("ACESSEI O TENTATIVA MODEL - function buscarKPIs():", idUsuario);
    var instrucaoSql = `
        SELECT 
            SUM(acertos) AS totalAcertos,
            SUM(erros) AS totalErros,
            COUNT(*) AS totalTentativas,
            SUM(playerPoints) AS totalPP
        FROM tentativa WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPrecisaoUltimas10(idUsuario) {
    console.log("ACESSEI O TENTATIVA MODEL - function buscarPrecisaoUltimas10():", idUsuario);
    var instrucaoSql = `
        SELECT AVG(precisao) AS precisaoMedia FROM (
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
        SELECT usuario.nome, tentativa.dificuldade, tentativa.acertos, tentativa.erros, tentativa.playerPoints, tentativa.data_hora
        FROM tentativa AS tentativa
        JOIN usuario AS usuario ON tentativa.fkUsuario = usuario.id
        ORDER BY tentativa.playerPoints DESC
        LIMIT 50;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrar(fkUsuario, dificuldade, acertos, erros, playerPoints) {
    console.log("ACESSEI O TENTATIVA MODEL - function registrar():", fkUsuario, dificuldade, acertos, erros, playerPoints);
    var instrucaoSql = `
        INSERT INTO tentativa (fkUsuario, dificuldade, acertos, erros, playerPoints) 
        VALUES (${fkUsuario}, '${dificuldade}', ${acertos}, ${erros}, ${playerPoints});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorUsuario(idUsuario){
    console.log("ACESSEI O TENTATIVA MODEL - function buscarPorUsuario():", idUsuario);
    var instrucaoSql = `
        SELECT id, dificuldade, acertos, erros, playerPoints, data_hora 
        FROM tentativa WHERE fkUsuario = ${idUsuario}
        ORDER BY data_hora DESC;
    `;
    console.log("Executando a instruçção SQL: \n" + instrucaoSql);
}

module.exports = {
    buscarKPIs,
    buscarPrecisaoUltimas10,
    buscarRanking,
    registrar,
    buscarPorUsuario
};