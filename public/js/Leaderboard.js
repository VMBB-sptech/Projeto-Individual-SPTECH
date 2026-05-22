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
        // Para filtros "acertos" e "erros" (meiucas)
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

    let botoes = document.querySelectorAll(".filtro-button");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].className = "filtro-button";
    }

    let filtroSelecionado = `filtro_${filtro}`;

    let botaoSelecionado = document.getElementById(filtroSelecionado);

    if (botaoSelecionado) {
        botaoSelecionado.className = "filtro-button ativo";
    }

    if (filtro === "playerPoints") {

        let agrupado = [];

        for (let i = 0; i < dadosRanking.length; i++) {
            let player = null;
            let temp = dadosRanking[i];
            
            for (let g = 0; g < agrupado.length; g++) {
                if (agrupado[g].nome === temp.nome) {
                    player = agrupado[g];
                    break;
                }
            }

            if (player) {
                player.acertos += Number(temp.acertos);
                player.erros += Number(temp.erros);
                player.playerPoints += Number(temp.playerPoints);
            } else {
                agrupado.push(
                    {
                        nome: temp.nome,
                        acertos: Number(temp.acertos),
                        erros: Number(temp.erros),
                        playerPoints: Number(temp.playerPoints)
                    }
                );
            }
        }

        // Ordenação por Player Points (Bubble Sort)
        //algoritmo simples que percorre uma lista comparando elementos vizinhos, trocando-os de lugar se estiverem na ordem "errada" (um menor que o anterior)
        for (let i = 0; i < agrupado.length - 1; i++) {
            for (let j = 0; j < agrupado.length - i - 1; j++) {
                let valorA = Number(agrupado[j].playerPoints);
                let valorB = Number(agrupado[j + 1].playerPoints);
                if (valorA < valorB) {
                    let temp = agrupado[j];
                    agrupado[j] = agrupado[j + 1];
                    agrupado[j + 1] = temp;
                }
            }
        }
        dadosExibicao = agrupado;
    } else if (filtro === "mediaAcertos") {

        let agrupadoMedia = [];
        
        for (let i = 0; i < dadosRanking.length; i++) {
            let player = null;
            let temp = dadosRanking[i];

            for (let j = 0; j < agrupadoMedia.length; j++) {
                if (agrupadoMedia[j].nome === temp.nome) {
                    player = agrupadoMedia[j];
                    break;
                }
            }

            if (player) {
                if (player.tentativas.length < 10) {
                    player.tentativas.push(temp);
                }
            } else {
                agrupadoMedia.push(
                    {
                    nome: temp.nome,
                    tentativas: [temp]
                    }
                );
            }
        }
        
        let listaResultado = [];

        for (let i = 0; i < agrupadoMedia.length; i++) {
            let somaPorcentagem = 0;
            let player = agrupadoMedia[i];

            for (let j = 0; j < player.tentativas.length; j++) {
                let temp = player.tentativas[j];
                let totalPerguntas = Number(temp.acertos) + Number(temp.erros);
                let precisao = totalPerguntas > 0 ? (Number(temp.acertos) / totalPerguntas) * 100 : 0;

                somaPorcentagem += precisao;
            }

            let media = somaPorcentagem / player.tentativas.length;

            listaResultado.push(
                {
                    nome: player.nome,
                    qtdTentativas: player.tentativas.length,
                    mediaAcertos: media
                }
            );
        }

        for (let i = 0; i < listaResultado.length - 1; i++) {
            for (let j = 0; j < listaResultado.length - i - 1; j++) {
                let valorA = Number(listaResultado[j].mediaAcertos);
                let valorB = Number(listaResultado[j + 1].mediaAcertos);
                if (valorA < valorB) {
                    let temp = listaResultado[j];
                    listaResultado[j] = listaResultado[j + 1];
                    listaResultado[j + 1] = temp;
                }
            }
        }
        dadosExibicao = listaResultado;

    } else {

        let copiaDados = [];

        for (let i = 0; i < dadosRanking.length; i++) {
            copiaDados.push(dadosRanking[i]);
        }

        for (let i = 0; i < copiaDados.length - 1; i++) {
            for (let j = 0; j < copiaDados.length - i - 1; j++) {
                let valorA = Number(copiaDados[j][filtro]);
                let valorB = Number(copiaDados[j + 1][filtro]);
                if (valorA < valorB) {
                    let temp = copiaDados[j];
                    copiaDados[j] = copiaDados[j + 1];
                    copiaDados[j + 1] = temp;
                }
            }
        }
        dadosExibicao = copiaDados;
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