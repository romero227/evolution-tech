// Espera o conteúdo da página carregar completamente antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-cadastro"); // Seleciona o formulário principal
  const idadeInput = document.getElementById("idade");
  const valorIdadeSpan = document.getElementById("valorIdade");
  const btnEnviar = document.getElementById("ienviar");

  // Função para atualizar o valor da idade exibido na tela
  function mudaIdade() {
    valorIdadeSpan.textContent = idadeInput.value;
  }

  // Função de validação do formulário
  function valida(event) {
    // Previne o envio padrão do formulário para podermos validar primeiro
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const dataNascimento = document.getElementById("data");
    const cpf = document.getElementById("cpf");
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const cidade = document.getElementById("cidade"); // Assuming the first 'cidade' is for city
    const bairro = document.getElementById("bairro");
    const uf = document.getElementById("uf"); // Assuming the input for UF
    const numero = document.getElementById("numero");
    const celular = document.getElementById("cel");
    const username = document.getElementById("username");
    const senha = document.getElementById("senha");
    const confirmaSenha = document.getElementById("confirma-senha");

    let mensagemErro = "";

    if (nome.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo Nome Completo.\n";
    }

    if (email.value.trim() === "" || !email.value.includes("@")) {
      mensagemErro += "Por favor, insira um E-mail válido.\n";
    }

    if (dataNascimento.value.trim() === "") {
      mensagemErro += "Por favor, preencha a Data de Nascimento.\n";
    }

    if (
      cpf.value.trim() === "" ||
      cpf.value.length !== 11 ||
      !/^\d+$/.test(cpf.value)
    ) {
      mensagemErro += "Por favor, preencha o CPF com 11 dígitos numéricos.\n";
    }

    if (cep.value.trim() === "" || cep.value.length !== 9) {
      // Assuming format XX.XXX-XXX or XXXXX-XXX
      mensagemErro +=
        "Por favor, preencha o CEP corretamente (ex: XXXXX-XXX).\n";
    }

    if (endereco.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo Endereço.\n";
    }

    if (cidade.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo Cidade.\n";
    }

    if (bairro.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo Bairro.\n";
    }

    if (uf.value.trim() === "" || uf.value.length !== 2) {
      mensagemErro += "Por favor, preencha o campo UF com 2 letras.\n";
    }

    if (numero.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo Número.\n";
    }

    if (celular.value.trim() === "" || celular.value.length < 10) {
      // Basic check for phone number length
      mensagemErro += "Por favor, preencha o campo Celular com DDD e número.\n";
    }

    if (username.value.trim() === "") {
      mensagemErro += "Por favor, preencha o campo Nome de usuário.\n";
    }

    if (senha.value === "") {
      mensagemErro += "Por favor, preencha o campo Senha.\n";
    } else if (senha.value.length < 6 || senha.value.length > 8) {
      mensagemErro += "A senha deve ter entre 6 e 8 caracteres.\n";
    }

    if (senha.value !== confirmaSenha.value) {
      mensagemErro += "Os campos Senha e Confirmar Senha devem ser iguais.\n";
    }

    // No 'formacao' field in this form, so removed that validation

    if (mensagemErro !== "") {
      alert(mensagemErro);
    } else {
      // Store user data in localStorage (for demonstration)
      const userData = {
        nome: nome.value,
        email: email.value,
        username: username.value,
        // Do NOT store password directly in localStorage in a real application!
        // This is for demonstration purposes only.
        senha: senha.value,
      };
      localStorage.setItem("usuarioCadastro", JSON.stringify(userData));

      alert(
        "Cadastro realizado com sucesso! Você será redirecionado para a página de login."
      );
      window.location.href = "login.html"; // Redirect to login page
    }
  }

  // Function for CEP mask (added)
  function mascaraCEP(input) {
    input.value = input.value.replace(/\D/g, ""); // Remove tudo o que não é dígito
    input.value = input.value.replace(/^(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen
  }
  window.mascaraCEP = mascaraCEP; // Make it globally accessible for oninput

  // Adiciona os "escutadores" de eventos aos elementos
  // Removed idadeInput listener as it's not relevant for this form
  const submitButton = form.querySelector(".botao-cadastro");
  if (submitButton) {
    submitButton.addEventListener("click", valida);
  }
});
