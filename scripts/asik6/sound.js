$(document).ready(function () {
  console.log("sound.js connected ✅");

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const username = $("#username").val().trim();
    const password = $("#password").val().trim();
    const errorMsg = $("#error-message");

    // Get the saved user data from localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));

    // Check if all fields are filled
    if (username === "" || password === "") {
      errorMsg.text("Please fill in all fields.");
      return;
    }

    // Check if the user exists
    if (!savedUser) {
      errorMsg.text("User not found. Please register first.");
      return;
    }

    // Check username and password
    if (username === savedUser.username && password === savedUser.password) {
      // Save login status
      savedUser.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(savedUser));

      // Play login sound
      const sound = new Audio("../sounds/notification.mp3");
      sound.currentTime = 0;
      sound.play();

      // Show toast message
      $("#toast").text("Successfully logged in!").css("opacity", "1");

      // After 1.5 seconds — hide toast and redirect to profile page
      setTimeout(() => {
        $("#toast").css("opacity", "0");
        window.location.href = "aliya-profile.html";
      }, 1500);

    } else {
      // If login data is incorrect
      errorMsg.text("Invalid username or password.");
    }
  });
});
