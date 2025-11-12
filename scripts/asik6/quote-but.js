const adviceButton = document.querySelector(".advice-but");
const adviceDisplay = document.querySelector("#advice");

adviceButton.addEventListener("click", async () => {
    adviceDisplay.style.opacity = 0;

    setTimeout(() => {
        adviceDisplay.textContent = "Loading...";
        adviceDisplay.style.opacity = 0.5;
    }, 200);

    try {
        const response = await fetch(`https://api.adviceslip.com/advice`);
        const data = await response.json();

        const advice = data.slip.advice;

        setTimeout(() => {
            adviceDisplay.textContent = `"${advice}"`;
            adviceDisplay.style.opacity = 1;
        }, 800);

    } catch (error) {
        adviceDisplay.textContent = "Failed to fetch advice. Please try again.";
        adviceDisplay.style.opacity = 1;
        console.error("API error:", error);
    }
});
