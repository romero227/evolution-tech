const botao = document.getElementById("toggle-dark-mode");
    botao.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });