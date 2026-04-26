function mudarParaCadastro() {
    div_login.style.display = "none";
    div_cadastro.style.display = "block";
    titulo_conta.innerHTML = "Crie sua conta";
    // Limpando mensagem de erro ao trocar de tela
    div_mensagem.style.display = "none";
    div_mensagem.innerHTML = "";
}

function mudarParaLogin() {
    div_login.style.display = "block";
    div_cadastro.style.display = "none";
    titulo_conta.innerHTML = "Acesse sua conta";
    // Garantindo que a mensagem comece oculta ao voltar para o login
    div_mensagem.style.display = "none";
    div_mensagem.innerHTML = "";
}

function VerificarCadastro() {

}

function cadastrarUsuario() {
    alert("Cadastro realizado com sucesso! Agora você pode fazer o login.");

    // Chamamos a função que troca as abas na tela (definida no script do HTML)
    mudarParaLogin();
}

function loginUsuario() {
    let emailLogin = input_email_login.value;
    let senhaLogin = input_senha_login.value;

    // Ocultamos a div no início de cada tentativa para "limpar" o estado anterior
    div_mensagem.style.display = "none";
    div_mensagem.innerHTML = "";

    if (emailLogin == "" || emailLogin == null) {
        div_mensagem.style.display = "flex";
        div_mensagem.innerHTML = `<b color: red;">Preencha o campo de e-mail</b>`;
        return;
    }

    if (senhaLogin == "" || senhaLogin == null) {
        div_mensagem.style.display = "flex";
        div_mensagem.innerHTML = `<b color: red;">Preencha o campo de senha</b>`;
        return;
    }

    if (!emailLogin.includes("@") || !emailLogin.includes(".")) {
        div_mensagem.style.display = "flex";

        if (!emailLogin.includes("@")) {
            div_mensagem.innerHTML += `<b color: red;">O email deve conter "@"</b> <br>`;
        }
        if (!emailLogin.includes(".")) {
            div_mensagem.innerHTML += `<b color: red;">O email deve conter "."</b> <br>`;
        }
        return;
    }

    alert("Login realizado com sucesso!")
}