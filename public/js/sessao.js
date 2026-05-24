// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email == null || nome == null) {
        window.location = "conta.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "conta.html";
}

function verificarAcessoProfile() {
    let idUsuario = sessionStorage.ID_USUARIO;
    if (!idUsuario) {
        return;
    }
    fetch(`/tentativas/kpis/${idUsuario}`).then(
        function (resposta) {
            if (resposta.ok) {
                resposta.json().then(
                    function (dados) {
                        let totalTentativas = 0;
                        if (dados.length > 0) {
                            totalTentativas = Number(dados[0].totalTentativas) || 0;
                        }

                        if (totalTentativas === 0) {
                            //pega o caminho da pasta, dividindo em '/' e pegando o ultimo elemento com pop
                            let paginaAtual = window.location.pathname.split("/").pop();
                        
                            //se a página atual for AboutYou.html
                            if (paginaAtual.toLowerCase() === "aboutyou.html") {
                                alert("Realize uma tentativa no quiz para continuar");
                                window.location = "Quiz.html";
                            } else {
                                //busca o link do profile na barra lateral
                                //usa [href='AboutYou.html'] para buscar pelo atributo href
                                let linkProfile = document.querySelector(".barra-lateral a[href='AboutYou.html']");
                                if (linkProfile) {
                                    linkProfile.classList.add("desabilitado");
                                }
                            }
                        }
                    }
                );
            }
        }
    ).catch(
        function (erro) {
            console.log("Erro ao verificar acesso ao profile:", erro);
        }
    );
}

// Quando a página carrega completamente, executa a função de validação
window.addEventListener('DOMContentLoaded', 
    function() {
        verificarAcessoProfile();
    }
);

