// c:\projetos\evolution-tech\home\cursos\cursos.js

document.addEventListener("DOMContentLoaded", function () {
  // Recupera dados do cadastro
  const usuario = JSON.parse(localStorage.getItem("usuarioCadastro") || "{}");

  // Verifica se está logado e se o nome do usuário está disponível
  if (!localStorage.getItem("usuarioLogado") || !usuario.nome) {
    // Se não estiver logado ou nome não está no cadastro, volta para login
    window.location.href = "../cadastro-login/login.html"; // Corrected path
  } else {
    // Exibe mensagem de boas-vindas com nome
    document.getElementById("bemvindo").textContent =
      "Bem-vindo(a), " + usuario.nome + "!";
  }

  // Função de logout
  window.logout = function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "../index.html"; // Corrected path to main home page
  };
});
