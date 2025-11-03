document.addEventListener("DOMContentLoaded", () => {
    const floatingButton = document.querySelector(".theme-toggle");
    const body = document.body;

    // Loading saved theme
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        body.classList.add("dark-theme");
        if (floatingButton) floatingButton.textContent = "🌞";
    } else {
        if (floatingButton) floatingButton.textContent = "🌙";
    }

    // Switch function
    function toggleTheme() {
        body.classList.toggle("dark-theme");

        if (body.classList.contains("dark-theme")) {
            if (floatingButton) floatingButton.textContent = "🌞";
            localStorage.setItem("theme", "dark");
        } else {
            if (floatingButton) floatingButton.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    }

    // Adding click handlers
    if (floatingButton) floatingButton.addEventListener("click", toggleTheme);
});
