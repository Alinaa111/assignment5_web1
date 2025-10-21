document.addEventListener("DOMContentLoaded", () => {
  const soundBtn = document.getElementById("soundBtn");
  const sound = new Audio("../sounds/notification.mp3");

  soundBtn.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play();

    soundBtn.classList.add("active");
    setTimeout(() => soundBtn.classList.remove("active"), 200);
  });
});
