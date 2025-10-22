// const quoteButton = document.querySelector(".quote-but")
// const quoteDisplay = document.querySelector("#quote");

// quoteButton.addEventListener("click", async () => {
//     try {
//         const response = await fetch("https://api.quotable.io/random")
//         const data = await response.json();
//         quoteDisplay.textContent = `"${data.content}" - ${data.author}`;
//     }
//     catch (error) {
//         quoteDisplay.textContent = "Failed to load a new quote. Please try again.";
//     }
// });


const quotes = [
    `"Success is not final, failure is not fatal: It is the courage to continue that counts." - Winston Churchill`,
    `"The only way to prove that you're a good sport is to lose." `,
    `"It's not what you do once in a while; it's what you do day in and day out that makes the difference."`,
    `"The pain you feel today will show itself as strength tomorrow." - Tunde Oyeneyin`,
    `"Dreams are free. Goals have a cost. While you can daydream for free, goals don't come without a price. Time, Effort, Sacrifice, and Sweat." - Usain Bolt` ,
    `"You just can't beat the person who never gives up." - Babe Ruth`,
    `"The secret of getting ahead is getting started." - Mark Twain`,
    `"Champions aren't made in the gyms. Champions are made from something they have deep inside them -- a desire, a dream, a vision." - Muhammad Ali`,
    `"If you don’t find the time, if you don’t do the work, you don’t get the results." - Arnold Schwarzenegger`,
    `'The real workout starts when you want to stop." – Ronnie Coleman`
]

const quoteButton = document.querySelector(".quote-but")
const quoteDisplay = document.querySelector("#quote");

quoteButton.addEventListener("click", () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.style.opacity = 0;
    setTimeout(() => {
        quoteDisplay.textContent = randomQuote;
        quoteDisplay.style.opacity = 1;
    }, 300);

});