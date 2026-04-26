
function mudarParaCadastro() {
    div_login.style.display = "none";
    div_cadastro.style.display = "block";
    titulo_conta.innerHTML = "Crie sua conta";

    // Usando a função de limpar as mensagens
    limparMensagens();
}

function mudarParaLogin() {
    div_login.style.display = "block";
    div_cadastro.style.display = "none";
    titulo_conta.innerHTML = "Acesse sua conta";

    limparMensagens();
}

//função de limpeza
function limparMensagens() {
    // Limpando o conteúdo
    div_mensagem.innerHTML = "";
    div_mensagem_cadastro.innerHTML = "";

    // Escondendo as caixas para o design ficar limpo
    div_mensagem.style.display = "none";
    div_mensagem_cadastro.style.display = "none";
}

function VerificarCadastro() {
    let pontos = 0;

    let senha = input_senha_cadastro.value;

    let temNumero = false;
    let temEspecial = false;

    let listaNumeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let listaEspeciais = ["!", "@", "#", "$", "%", "&", "*", "?", "/", "_", "-", ",", "|", ";", ":", ">", "<", "°", "º", "[", "]", "{", "}", "(", ")", "^", "¹", "²", "³", "£", "¢", "¬", "®", "©", `"`, "'", "`", "§"];

    // Se a senha estiver vazia, apenas limpamos o feedback e saímos
    if (senha == "") {
        div_feedback_senha.style.display = "none";
        div_feedback_senha.innerHTML = "";
        return;
    }

    // Lógica de verificação
    for (let i = 0; i < senha.length; i++) {
        let letra = senha[i];

        for (let j = 0; j < listaNumeros.length && !temNumero; j++) {
            if (letra == listaNumeros[j]) {
                temNumero = true;
            }
        }

        for (let k = 0; k < listaEspeciais.length && !temEspecial; k++) {
            if (letra == listaEspeciais[k]) {
                temEspecial = true;
            }
        }
    }

    if (temNumero) pontos++;
    if (temEspecial) pontos++;
    if (senha.length >= 8) pontos++;
    if (senha != senha.toLowerCase()) pontos++;

    // Mostrando o feedback
    div_feedback_senha.style.display = "block";

    if (pontos <= 1) {
        div_feedback_senha.innerHTML = `<span style="color: red;">Senha Insegura</span>`;
    } else if (pontos <= 3) {
        div_feedback_senha.innerHTML = `<span style="color: yellow;">Senha Fraca</span>`;
    } else {
        div_feedback_senha.innerHTML = `<span style="color: green;">Senha Segura!</span>`;
    }
}

function cadastrarUsuario() {
    let pontos = 0;

    let nome = input_nome_cadastro.value;
    let email = input_email_cadastro.value;
    let senha = input_senha_cadastro.value;
    let confirmacao = input_senha_cadastro_confirmar.value;

    let temNumero = false;
    let temEspecial = false;

    let listaNumeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let listaEspeciais = ["!", "@", "#", "$", "%", "&", "*", "?", "/", "_", "-", ",", "|", ";", ":", ">", "<", "°", "º", "[", "]", "{", "}", "(", ")", "^", "¹", "²", "³", "£", "¢", "¬", "®", "©", `"`, "'", "`", "§"];


    limparMensagens();

    // verificando se algum campo está vazio
    if (nome == "" || email == "" || senha == "" || confirmacao == "") {
        div_mensagem_cadastro.style.display = "flex";
        div_mensagem_cadastro.innerHTML = `<b style="color: red;">Preencha todos os campos!</b>`;
        return;
    }

    // Validando o email
    if (!email.includes("@") || !email.includes(".")) {
        div_mensagem_cadastro.style.display = "flex";
        div_mensagem_cadastro.innerHTML = `<b style="color: red;">Email inválido! Deve conter '@' e '.'</b>`;
        return;
    }

    // as senhas são iguais? se não forem cai fora (retorna erro btw)
    if (senha != confirmacao) {
        div_mensagem_cadastro.style.display = "flex";
        div_mensagem_cadastro.innerHTML = `<b style="color: red;">As senhas não coincidem!</b>`;
        return;
    }

    // Validação de segurança
    for (let i = 0; i < senha.length; i++) {
        let letra = senha[i];

        for (let j = 0; j < listaNumeros.length && !temNumero; j++) {
            if (letra == listaNumeros[j]) {
                temNumero = true;
            }
        }

        for (let k = 0; k < listaEspeciais.length && !temEspecial; k++) {
            if (letra == listaEspeciais[k]) {
                temEspecial = true;
            }
        }
    }

    if (temNumero) {
        pontos++;
    }

    if (temEspecial) {
        pontos++;
    }

    if (senha.length >= 8) {
        pontos++;
    }

    if (senha != senha.toLowerCase()) {
        pontos++;
    }

    // Mostrando o retorno da senha na div de mensagens principal
    div_mensagem_cadastro.style.display = "flex";

    if (pontos <= 1) {
        div_mensagem_cadastro.innerHTML = `<b style="color: red;">Senha Insegura</b>`;
        return;
    } else if (pontos <= 3) {
        div_mensagem_cadastro.innerHTML = `<b style="color: yellow;">Senha Fraca</b>`;
        return;
    } else {
        div_mensagem_cadastro.innerHTML = `<b style="color: green;">Senha Segura!</b>`;
    }

    alert("Cadastro realizado com sucesso! Agora você pode fazer o login.");
    mudarParaLogin();
}

function loginUsuario() {
    let emailLogin = input_email_login.value;
    let senhaLogin = input_senha_login.value;

    limparMensagens();

    if (emailLogin == "" || emailLogin == null) {
        div_mensagem.style.display = "flex";
        div_mensagem.innerHTML = `<b style="color: red;">Preencha o campo de e-mail</b>`;
        return;
    }

    if (senhaLogin == "" || senhaLogin == null) {
        div_mensagem.style.display = "flex";
        div_mensagem.innerHTML = `<b style="color: red;">Preencha o campo de senha</b>`;
        return;
    }

    if (!emailLogin.includes("@") || !emailLogin.includes(".")) {
        div_mensagem.style.display = "flex";

        if (!emailLogin.includes("@")) {
            div_mensagem.innerHTML += `<b style="color: red;">O email deve conter "@"</b> <br>`;
        }
        if (!emailLogin.includes(".")) {
            div_mensagem.innerHTML += `<b style="color: red;">O email deve conter "."</b> <br>`;
        }
        return;
    }

    alert("Login realizado com sucesso!");
}

// Funções para mostrar/esconder a senha ao passar o cursor

function mostrarSenhaLogin() {
    input_senha_login.type = "text";
}
function esconderSenhaLogin() {
    input_senha_login.type = "password";
}

function mostrarSenhaCadastro() {
    input_senha_cadastro.type = "text";
}
function esconderSenhaCadastro() {
    input_senha_cadastro.type = "password";
}

function mostrarSenhaConfirmar() {
    input_senha_cadastro_confirmar.type = "text";
}
function esconderSenhaConfirmar() {
    input_senha_cadastro_confirmar.type = "password";
}
