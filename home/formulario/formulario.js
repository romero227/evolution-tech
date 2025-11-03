// Função para validar o formato básico de um e-mail
function validarEmail(email) {
  // Regex simples para verificar a estrutura: nome@dominio.com
  // Define uma expressão regular (um padrão de texto) para verificar se o e-mail tem um formato válido.
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Testa se o e-mail fornecido corresponde ao padrão da expressão regular. Retorna true (verdadeiro) se for válido, e false (falso) se não for.
  return regexEmail.test(email);
}

// Função para validar um número de celular brasileiro (DD9XXXXXXXX - 11 dígitos)
function validarCelularBrasileiro(numero) {
  // Remove qualquer caractere que não seja dígito
  // Usando replace com uma expressão regular, remove tudo que não for um número (de 0 a 9) da string do telefone.
  const numeroLimpo = numero.replace(/\D/g, "");

  // Regex para DD (1-9) + 9 + 8 dígitos (total 11)
  // Define uma expressão regular para o formato de celular brasileiro com 11 dígitos (DDD + 9 + número).
  const regexCelular = /^(?:[1-9]{2})9\d{8}$/;

  // Testa se o número de telefone limpo corresponde ao padrão. Retorna true se for válido, e false se não for.
  return regexCelular.test(numeroLimpo);
}

// --- FUNÇÃO PRINCIPAL PARA EXIBIR ERROS NO HTML ---
// Esta função é responsável por mostrar uma mensagem de erro específica para um campo do formulário.
function exibirMensagemErro(campoId, mensagem) {
  // A primeira letra do ID do campo de erro é maiúscula (ex: 'Nome' para 'erroNome')
  // Constrói o ID do elemento de erro (ex: 'erroNome', 'erroEmail') para saber onde exibir a mensagem.
  const elementoErro = document.getElementById(
    `erro${campoId.charAt(0).toUpperCase() + campoId.slice(1)}`
  );

  // Limpa o conteúdo de todos os elementos de erro antes de exibir a nova
  // Seleciona todos os elementos com a classe 'mensagem-erro' e apaga o texto deles para garantir que apenas a mensagem de erro atual seja exibida.
  document
    .querySelectorAll(".mensagem-erro")
    .forEach((el) => (el.textContent = ""));

  // Se uma mensagem de erro foi fornecida...
  if (mensagem) {
    // ...define o texto do elemento de erro para ser essa mensagem.
    elementoErro.textContent = mensagem;
    // Opcional: foca no campo que deu erro para o usuário corrigir imediatamente
    // Coloca o cursor do usuário diretamente no campo do formulário que contém o erro.
    document.getElementById(campoId).focus();
  }
}

// Espera o conteúdo da página carregar completamente antes de executar o script
// Garante que o código JavaScript só será executado depois que toda a página HTML for carregada.
document.addEventListener("DOMContentLoaded", function () {
  // Pega a referência do formulário no HTML pelo seu ID 'iformulario'.
  const form = document.getElementById("iformulario");
  // Pega a referência do botão de envio no HTML pelo seu ID 'ienviar'.
  const btnEnviar = document.getElementById("ienviar");

  // Função de validação do formulário
  // Esta função será chamada quando o usuário clicar no botão de enviar.
  function valida(event) {
    // Previne o envio padrão do formulário
    // Impede que a página seja recarregada ao enviar o formulário, para que possamos fazer a validação com JavaScript.
    event.preventDefault();

    let temErro = false; // Flag (bandeira) para rastrear se algum erro foi encontrado

    // 1. Limpa todas as mensagens de erro antes de começar uma nova validação
    document
      // Apaga todas as mensagens de erro existentes antes de começar a verificar os campos novamente.
      .querySelectorAll(".mensagem-erro")
      .forEach((el) => (el.textContent = ""));

    // --- VALIDAÇÕES CAMPO POR CAMPO ---

    // A. NOME (Obrigatório)
    if (form.nome.value.trim() === "") {
      // Se o campo nome estiver vazio (após remover espaços em branco), exibe uma mensagem de erro.
      exibirMensagemErro("nome", "Por favor, preencha o campo Nome.");
      temErro = true;
    }

    // B. E-MAIL (Obrigatório e formato válido)
    else if (form.email.value.trim() === "") {
      // Se o campo de e-mail estiver vazio, exibe um erro.
      exibirMensagemErro("email", "Por favor, preencha o campo E-mail.");
      temErro = true;
    } else if (!validarEmail(form.email.value)) {
      // Se o e-mail não for válido (de acordo com a função validarEmail), exibe um erro.
      exibirMensagemErro(
        "email",
        "Por favor, insira um endereço de E-mail válido."
      );
      temErro = true;
    }

    // C. TELEFONE (Obrigatório e formato de celular brasileiro válido)
    else if (form.telefone.value.trim() === "") {
      // Se o campo de telefone estiver vazio, exibe um erro.
      exibirMensagemErro(
        "telefone",
        "Por favor, preencha o campo Telefone."
      );
      temErro = true;
    } else if (!validarCelularBrasileiro(form.telefone.value)) {
      // Se o telefone não for um celular brasileiro válido, exibe um erro.
      exibirMensagemErro(
        "telefone",
        "Telefone inválido. Verifique seu número"
      );
      temErro = true;
    }

    // D. CURSO (Obrigatório, não pode ser a opção padrão vazia)
    else if (form.curso.value === "") {
      // Se nenhuma opção de curso foi selecionada, exibe um erro.
      exibirMensagemErro("curso", "Por favor, selecione um curso.");
      temErro = true;
    }

    // E. MENSAGEM (Obrigatório, com no mínimo 10 caracteres)
    else if (form.mensagem.value.trim() === "") {
      // Se o campo de mensagem estiver vazio, exibe um erro.
      exibirMensagemErro(
        "mensagem",
        "Por favor, preencha o campo Mensagem."
      );
      temErro = true;
    } else if (form.mensagem.value.length < 10) {
      // Se a mensagem tiver menos de 10 caracteres, exibe um erro.
      exibirMensagemErro(
        "mensagem",
        "A mensagem deve ter no mínimo 10 caracteres."
      );
      temErro = true;
    }

    // --- DECISÃO FINAL ---
    // Verifica se a variável 'temErro' continua como 'false'.
    if (!temErro) {
      // Se a flag 'temErro' for false, envia o formulário
      // Se não houver erros, exibe um alerta de sucesso.
      alert("Formulário enviado com sucesso!");
      form.submit();
     
    }
  }

  // Adiciona o "escutador" de evento ao botão de envio
  // Faz com que a função 'valida' seja executada sempre que o botão de envio for clicado.
  btnEnviar.addEventListener("click", valida);
});
