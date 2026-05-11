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


