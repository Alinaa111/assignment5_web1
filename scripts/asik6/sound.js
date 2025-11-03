$(document).ready(function () {
  console.log("jQuery is ready!");

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const username = $("#username").val().trim();
    const password = $("#password").val().trim();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && username === savedUser.username && password === savedUser.password) {
      
      // Play sound only if success
      const sound = new Audio("../sounds/notification.mp3");
      sound.currentTime = 0;
      sound.play();

      // Add login status
      localStorage.setItem("loggedIn", "true");

      // Toast visible
      $("#toast").css("opacity", "1");

      // Redirect after fade
      setTimeout(() => {
        $("#toast").css("opacity", "0");
        window.location.href = "../pages/aliya-profile.html";
      }, 1500);

    } else {
      $("#error-message").text("Invalid username or password");
    }
  });
});
