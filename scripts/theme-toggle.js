document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Loading saved theme
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
        body.classList.add("dark-theme");
        toggleButton.textContent = "🌞 Light Mode";
    }

    // Toggle theme on click
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        
        if (body.classList.contains("dark-theme")) {
            toggleButton.textContent = "🌞 Light Mode";
            localStorage.setItem("theme", "dark");
        }
        else {
            toggleButton.textContent = "🌙 Dark Mode";
            localStorage.setItem("theme", "light");
        }
    })

    // Example with changing style through JS
    const hero = document.querySelector(".hero");
    hero.style.transform = "scale(1.02)";
    hero.style.transition = "transform 0.3s ease";

});