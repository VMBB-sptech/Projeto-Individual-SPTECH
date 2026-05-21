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
                                kpi_precisao.innerHTML = `${Math.round(dados[0].precisaoMedia)} %`;
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
    }
