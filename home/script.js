// c:\projetos\evolution-tech\home\script.js

document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode Toggle
  const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
  if (toggleDarkModeButton) {
    toggleDarkModeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      // Optionally save user preference
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });

    // Apply saved theme on load
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    }
  }

});

