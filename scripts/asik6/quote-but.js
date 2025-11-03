const quoteButton = document.querySelector(".quote-but");
const quoteDisplay = document.querySelector("#quote");

quoteButton.addEventListener("click", async () => {
    quoteDisplay.style.opacity = 0;

    setTimeout(() => {
        quoteDisplay.textContent = "Loading...";
        quoteDisplay.style.opacity = 0.5;
    }, 200);

    try {
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent("https://zenquotes.io/api/random?nocache=" + Math.random())}`);
        const data = await response.json();

        const quote = data[0].q;
        const author = data[0].a;

        setTimeout(() => {
            quoteDisplay.textContent = `"${quote}" — ${author}`;
            quoteDisplay.style.opacity = 1;
        }, 800);

    } catch (error) {
        quoteDisplay.textContent = "Failed to fetch quote. Please try again.";
        quoteDisplay.style.opacity = 1;
        console.error("API error:", error);
    }
});
