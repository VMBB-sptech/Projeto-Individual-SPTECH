let dadosRanking = [];
let filtroInicial = "playerPoints";

let medalhasPosicao = ["1", "2", "3",];
let classePosicao = ["ranking-ouro", "ranking-prata", "ranking-bronze"];

function renderizarTabela() {
    let corpo = corpo_ranking;
    corpo.innerHTML = "";

    if (dadosRanking.length == 0 || dadosRanking == null) {
        corpo.innerHTML = `<div class="ranking-vazio">Nenhum dado encontrado</div>`;
        return;
    }

    for (let i = 0; i < dadosRanking.length; i++) {
        let linha = dadosRanking[i];

        let classeEspecial = ``;
        let textoPos = i + 1;

        if (i < 3) {
            classeEspecial = classePosicao[i];
            textoPos = medalhasPosicao[i];
        }

        corpo.innerHTML += ` <div class="ranking-row ${classeEspecial}">
                                <div class="col ranking-posicao">${textoPos}</div>
                                <div class="col">${linha.nome}</div>
                                <div class="col">${linha.dificuldade}</div>
                                <div class="col">${linha.acertos}</div>
                                <div class="col">${linha.erros}</div>
                                <div class="col">${linha.playerPoints}</div>
                            </div>`;
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
                    renderizarTabela();
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