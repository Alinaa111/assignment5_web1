// Array of background colors
const colors = ["#89f7fe", "#6a82fb", "#00dfd8", "#b5b5b5ff", "#34a853", "#ffffff"];

// Select the button
const button = document.getElementById("colorButton");

// On button click → change background color randomly
button.addEventListener("click", () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});
