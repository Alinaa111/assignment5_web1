$(document).ready(function () {
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    const username = $("#regUsername").val().trim();
    const password = $("#regPassword").val().trim();
    const confirmPassword = $("#confirmPassword").val().trim();

    if (password !== confirmPassword) {
      $("#error-message").text("Passwords do not match!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, password }));

    showNotification("Account created successfully!");

    setTimeout(() => {
      window.location.href = "aliya-login.html";
    }, 1200);
  });
});
