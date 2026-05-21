let idUsuario = sessionStorage.ID_USUARIO;
let nomeUsuario = sessionStorage.NOME_USUARIO;

nome_usuario.innerHTML = `${nomeUsuario}`;

if(idUsuario){
    fetch("/tentativas/kpis/" + idUsuario).then(
        function (resposta){
            if(resposta.ok){
                resposta.json().then(
                    function (dados) {
                        if(dados.length > 0){
                            let kpis = dados[0];
                            kpi_acertos.innerHTML = `${(kpis.totalAcertos || 0)} / ${(Number(kpis.totalAcertos) + Number(kpis.totalErros) || 0)}`;
                            kpi_tentativas.innerHTML = `${(kpis.totalTentativas || 0)}`;
                            kpi_pp.innerHTML = `${(kpis.totalPP || 0)} pp`;
                        }
                    }
                );
            }
        }
    ) .catch (
        function (erro){
            console.log(`Erro ao buscar as KPI's: ${erro}`);
        }
    );
    fetch("/tentativas/precisao-ultimas10/" + idUsuario).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        if (dados.length > 0 && dados[0].precisaoMedia !== null) {
                            let precisaoFormatada = Math.round(dados[0].precisaoMedia);
                            if(precisaoFormatada >= 95){
                                kpi_precisao.innerHTML = `<span class="destaque-colorido">${precisaoFormatada} %</span>`;
                            } else if(precisaoFormatada > 90){
                                kpi_precisao.style.color = "#00ff87";
                                kpi_precisao.innerHTML = `${precisaoFormatada} %`;
                            }else if(precisaoFormatada < 25){
                                kpi_precisao.innerHTML = `<span style="color: #ff5e98;">${precisaoFormatada} %</span>`;
                            }else {
                                kpi_precisao.innerHTML = `${precisaoFormatada} %`;
                            }
                        } else {
                            kpi_precisao.innerHTML = `0%`;
                        }
                 }
                );
            }
        }
    ) .catch(
        function (erro) {
            console.log(`Erro ao buscar a precisão: ${erro}`);
        }
    );

    fetch("/tentativas/usuario/" + idUsuario).then(
        function(resposta){
            if(resposta.ok){
                resposta.json().then(
                    function(dados) {
                        let melhorNormal = 0;
                        let melhorHard = 0;
                        let melhorEspecialista = 0;

                        for(let i = 0; i < dados.length; i++){
                            let temp = dados[i];
                            let pp = parseFloat(temp.playerPoints) || 0;
                            if(temp.dificuldade === "normal" && pp >  melhorNormal){
                                melhorNormal = pp;
                            } else if (temp.dificuldade === "hard" && pp > melhorHard) {
                                melhorHard = pp;
                            } else if (temp.dificuldade === "veryHard" && pp > melhorEspecialista){
                                melhorEspecialista = pp;
                            }
                        }

                        criargraficoDeBarras(melhorNormal, melhorHard, melhorEspecialista);
                    }
                );
            }
        }
    ).catch(
        function(erro){
            console.log("Erro ao buscar dados no grafico: ", erro)
        }
    );

    fetch("/tentativas/ultimas10/" + idUsuario).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        criarGraficoLinhas(dados);
                    }
                );
            }
        }
    ).catch(
        function (erro) {
            console.log("Erro ao buscar últimas tentativas:", erro);
        }
    );

    function criargraficoDeBarras(normal, hard, especialista) {
        let ctx = GraficoDeBarra.getContext("2d");

        new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Normal', 'Difícil', 'Especialista'],
                    datasets: [{
                        label: 'Melhor PP',
                        data: [normal, hard, especialista],
                        backgroundColor: [
                            'rgba(46, 204, 113, 0.55)',
                            'rgba(231, 76, 60, 0.55)',
                            'rgba(255, 255, 255, 0.55)'
                        ],
                        borderColor: [
                            '#2ecc71',
                            '#e74c3c',
                            '#ffffff'
                        ],
                        borderWidth: 2,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.08)' },
                            ticks: { color: 'rgba(255,255,255,0.7)' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: 'rgba(255,255,255,0.7)' }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

        function criarGraficoLinhas(dados){
            let labels = [];
            let hardData = [];
            let normalData = [];
            let veryHardData = [];
            
            //.reverse inverte a ordem da contagem, logo começa do .length
            let dadosRevertidos = dados.slice().reverse();
            let totalPontos = dadosRevertidos.length;
            
            for (let i = 0; i < totalPontos; i++) {
                labels.push("#" + (i + 1));
            }
            
            //preenchendo apenas onde a dificuldade é igual
            for (let i = 0; i < totalPontos; i++) {
                let temp = dadosRevertidos[i];
                let precisão = parseFloat(temp.precisao) || 0;

                if (temp.dificuldade === "normal") {
                    normalData.push(precisão);
                    hardData.push(null);
                    veryHardData.push(null);

                } else if (temp.dificuldade === "hard") {
                    normalData.push(null);
                    hardData.push(precisão);
                    veryHardData.push(null);

                } else if (temp.dificuldade === "veryHard") {
                    normalData.push(null);
                    hardData.push(null);
                    veryHardData.push(precisão);

                } else {
                    //tudo nulo pois não achou nada
                    normalData.push(null);
                    hardData.push(null);
                    veryHardData.push(null);
                }
            }

            //Agora sim criando o gráfico
            let ctx = GraficoDeLinha.getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Normal',
                            data: normalData,
                            borderColor: '#2ecc71',
                            backgroundColor: 'rgba(46, 204, 113, 0.15)',
                            borderWidth: 2,
                            pointBackgroundColor: '#2ecc71',
                            pointRadius: 6,
                            pointHoverRadius: 9,
                            tension: 0.3,
                            fill: false,
                            spanGaps: true
                        },
                        {
                            label: 'Difícil',
                            data: hardData,
                            borderColor: '#e73f2d',
                            backgroundColor: 'rgba(231, 76, 60, 0.15)',
                            borderWidth: 2,
                            pointBackgroundColor: '#e74c3c',
                            pointRadius: 6,
                            pointHoverRadius: 9,
                            tension: 0.3,
                            fill: false,
                            spanGaps: true
                        },
                        {
                            label: 'Especialista',
                            data: veryHardData,
                            borderColor: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            borderWidth: 2,
                            pointBackgroundColor: '#ffffff',
                            pointRadius: 6,
                            pointHoverRadius: 9,
                            tension: 0.3,
                            fill: false,
                            spanGaps: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: 'rgba(255, 255, 255, 0.08)' },
                            ticks: {
                                color: 'rgba(255,255,255,0.7)',
                                callback: 
                                function (value){
                                    return value + '%';
                                }
                            },
                            title: {
                                display: true,
                                text: 'Precisão',
                                color: 'rgba(255,255,255,0.5)'
                            }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: 'rgba(255,255,255,0.7)' },
                            title: {
                                display: true,
                                text: 'Tentativa',
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: 'rgba(255,255,255,0.8)',
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 16
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: 
                                function (context){
                                    if (context.parsed.y === null){
                                        return '';
                                    }
                                    return context.dataset.label + ': ' + context.parsed.y + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
} else {
    criargraficoDeBarras(0,0,0);
    criarGraficoLinhas([]);
}
