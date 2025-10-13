document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const fields = {
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      showError(fields.email, "Please enter a valid email address.");
      valid = false;
    }

    if (!validatePassword(fields.password.value)) {
      showError(
        fields.password,
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      valid = false;
    }

    if (fields.confirmPassword.value !== fields.password.value) {
      showError(fields.confirmPassword, "Passwords do not match.");
      valid = false;
    }

    if (valid) {
      form.classList.add("success");
      form.reset();

    
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 500);
    }
  });


  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => clearError(field));
  });
});
