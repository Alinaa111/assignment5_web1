document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.getElementById("nextButton");
  const backButton = document.getElementById("backButton");
  const mainCard = document.getElementById("mainCard");
  const detailsCard = document.getElementById("detailsCard");

  if (nextButton && backButton && mainCard && detailsCard) {
    nextButton.addEventListener("click", () => {
      mainCard.classList.add("hidden");
      detailsCard.classList.remove("hidden");
    });

    backButton.addEventListener("click", () => {
      detailsCard.classList.add("hidden");
      mainCard.classList.remove("hidden");
    });
  }
});
