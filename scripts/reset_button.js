document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetBtn");

  resetBtn.addEventListener("click", () => {
    document.querySelectorAll("input").forEach(input => {
      input.value = "";
    });
    document.getElementById("error-message").textContent = "";
  });
});
