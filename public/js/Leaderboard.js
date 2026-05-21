let dadosRanking = [];
let filtroInicial = "playerPoints";

let medalhasPosicao = ["1", "2", "3",];
let classePosicao = ["ranking-ouro", "ranking-prata", "ranking-bronze"];

function renderizarTabela() {
    let corpo = corpo_ranking;
    corpo.innerHTML = "";

    let cabeçalho = document.querySelector(".ranking-header");

    if (dadosRanking.length == 0 || dadosRanking == null) {
        corpo.innerHTML = `<div class="ranking-vazio">Nenhum dado encontrado</div>`;
        return;
    }

    if (filtroAtual === "playerPoints") {
        cabeçalho.innerHTML = `
            <div class="col">Ranking</div>
            <div class="col">Jogador</div>
            <div class="col">Acertos Totais</div>
            <div class="col">Erros Totais</div>
            <div class="col">Player Points (Total)</div>
        `;
    } else if (filtroAtual === "mediaAcertos") {
        cabeçalho.innerHTML = `
            <div class="col">Ranking</div>
            <div class="col">Jogador</div>
            <div class="col">Quizes Realizados</div>
            <div class="col">Média de Acertos (%)</div>
        `;
    } else {
        // Para filtros "acertos" e "erros" (individuais)
        cabeçalho.innerHTML = `
            <div class="col">Ranking</div>
            <div class="col">Jogador</div>
            <div class="col">Dificuldade</div>
            <div class="col">Acertos</div>
            <div class="col">Erros</div>
            <div class="col">Player Points</div>
        `;
    }

    // renderizanod as linhas das tabelas
    for (let i = 0; i < dadosExibicao.length; i++) {
        let linha = dadosExibicao[i];
        let classeEspecial = ``;
        let textoPos = i + 1;

        //rankeano os top 3
        if (i < 3) {
            classeEspecial = classePosicao[i];
            textoPos = medalhasPosicao[i];
        }

        //aplicando os filtros
        if (filtroAtual === "playerPoints") {
            // layout exclusivo para o agrupamento
            corpo.innerHTML += `
                <div class="ranking-row ${classeEspecial}">
                    <div class="col ranking-posicao">${textoPos}</div>
                    <div class="col">${linha.nome}</div>
                    <div class="col">${linha.acertos}</div>
                    <div class="col">${linha.erros}</div>
                    <div class="col">${Number(linha.playerPoints).toFixed(2)}</div>
                </div>`;

        } else if (filtroAtual === "mediaAcertos") {
            // media de acertos e tal
            corpo.innerHTML += `
                <div class="ranking-row ${classeEspecial}">
                    <div class="col ranking-posicao">${textoPos}</div>
                    <div class="col">${linha.nome}</div>
                    <div class="col">${linha.qtdTentativas}</div>
                    <div class="col">${Number(linha.mediaAcertos).toFixed(1)}%</div>
                </div>`;

        } else {
            //filtro que estava na versão alterior (puramente mantido por conta dos dois filtros do meio)
            corpo.innerHTML += `
                <div class="ranking-row ${classeEspecial}">
                    <div class="col ranking-posicao">${textoPos}</div>
                    <div class="col">${linha.nome}</div>
                    <div class="col">${linha.dificuldade}</div>
                    <div class="col">${linha.acertos}</div>
                    <div class="col">${linha.erros}</div>
                    <div class="col">${Number(linha.playerPoints).toFixed(2)}</div>
                </div>`;
        }
    }
}

function filtrar(filtro) {
    filtroAtual = filtro;

    //querySelectorAll busca tudo que tem o "argumento" e coloca em uma lista
    let botoes = document.querySelectorAll(".filtro-button");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].className = "filtro-button";
    }

    let filtroSelecionado = `filtro_${filtro}`;
    let botaoSelecionado = document.getElementById(filtroSelecionado);
    botaoSelecionado.className = "filtro-button ativo";

    // fazendo um bubble sort padrão
    /*
        algoritmo de ordenação simples que organiza uma lista comparando pares de elementos adjacentes
        troca-os de lugar se estiverem na ordem errada
    */
    for (let i = 0; i < dadosRanking.length - 1; i++) {
        for (let j = 0; j < dadosRanking.length - i - 1; j++) {
            let valorA = Number(dadosRanking[j][filtro]);
            let valorB = Number(dadosRanking[j + 1][filtro]);
            if (valorA < valorB) {
                let dadoTemp = dadosRanking[j];
                dadosRanking[j] = dadosRanking[j + 1];
                dadosRanking[j + 1] = dadoTemp;
            }

        }
    }

    renderizarTabela();
}

fetch("/tentativas/ranking").then(
    function (resposta) {
        if (resposta.ok) {
            resposta.json().then(
                function (dados) {
                    dadosRanking = dados;
                    filtrar('playerPoints');
                }
            );
        } else {
            console.log("Erro ao buscar ranking");
        }
    }
).catch(
    function (erro) {
        console.log("Erro na requisição de ranking:", erro);
    }
);