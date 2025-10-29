document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const fields = {
    username: document.getElementById("regUsername"),
    email: document.getElementById("regEmail"),
    password: document.getElementById("regPassword"),
    confirmPassword: document.getElementById("confirmPassword"),
  };

  for (const key in fields) {
    const msg = document.createElement("small");
    msg.className = "error-text";
    fields[key].insertAdjacentElement("afterend", msg);
  }

  const showError = (input, message) => {
    const error = input.nextElementSibling;
    input.classList.add("error");
    error.textContent = message;
  };

  const clearError = (input) => {
    const error = input.nextElementSibling;
    input.classList.remove("error");
    error.textContent = "";
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    Object.values(fields).forEach(clearError);

    if (fields.username.value.trim() === "") {
      showError(fields.username, "Username is required.");
      valid = false;
    }

    if (!validateEmail(fields.email.value)) {
      showError(fields.email, "Invalid email address.");
      valid = false;
    }

    if (!validatePassword(fields.password.value)) {
      showError(fields.password,
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      valid = false;
    }

    if (fields.confirmPassword.value !== fields.password.value) {
      showError(fields.confirmPassword, "Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    const existing = JSON.parse(localStorage.getItem("user"));
    if (existing && existing.email === fields.email.value.trim()) {
      showError(fields.email, "User with this email already exists.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: fields.username.value.trim(),
        email: fields.email.value.trim(),
        password: fields.password.value.trim(),
      })
    );

    const sound = new Audio("../sounds/notification.mp3");
    sound.play();

    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      window.location.href = "aliya-login.html";
    }, 1500);
  });

  Object.values(fields).forEach((field) =>
    field.addEventListener("input", () => clearError(field))
  );
});
