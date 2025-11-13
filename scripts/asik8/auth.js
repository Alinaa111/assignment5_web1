document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const inPages = window.location.pathname.includes("/pages/");
  const base = inPages ? "" : "pages/";

  const navRight = document.querySelectorAll(".nav_right");
  const asides = document.querySelectorAll("aside nav ul");

  // Проверяем, вошёл ли пользователь
  const isLogged = !!(user && user.loggedIn);

  // === 1️⃣ Рендерим навигацию ===
  function renderNav(isLogged) {
    navRight.forEach(nr => {
      nr.innerHTML = "";
      if (isLogged) {
        nr.insertAdjacentHTML(
          "beforeend",
          `<li><a href="${base}aliya-profile.html">Profile</a></li>
           <li><a href="#" id="logoutTop">Logout</a></li>`
        );
      } else {
        nr.insertAdjacentHTML(
          "beforeend",
          `<li><a href="${base}aliya-profile-guest.html">Profile</a></li>
           <li><a href="${base}aliya-login.html">Login</a></li>`
        );
      }
    });

    // === 2️⃣ Membership ===
    const membershipLink = document.getElementById("membershipLink");
    if (membershipLink) {
      membershipLink.href = isLogged
        ? "karima-membership.html"
        : "buymembership.html"; // ✅ твоя страница для неавторизованных
    }

    // === 3️⃣ Профиль в aside ===
    asides.forEach(ul => {
      let found = false;
      ul.querySelectorAll("li a").forEach(a => {
        if (a.textContent.trim().toLowerCase().startsWith("profile")) {
          found = true;
          a.href = isLogged
            ? `${base}aliya-profile.html`
            : `${base}aliya-profile-guest.html`;
          a.textContent = "Profile";
        }

        if (a.href && a.href.includes("aliya-login.html")) {
          a.style.display = isLogged ? "none" : "block";
        }
      });

      if (!found) {
        ul.insertAdjacentHTML(
          "beforeend",
          `<li><a href="${
            isLogged
              ? `${base}aliya-profile.html`
              : `${base}aliya-profile-guest.html`
          }">Profile</a></li>`
        );
      }
    });

    // === 4️⃣ Logout ===
    const logoutTop = document.getElementById("logoutTop");
    if (logoutTop) {
      logoutTop.addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem("loggedIn");
        if (user) {
          delete user.loggedIn;
          localStorage.setItem("user", JSON.stringify(user));
        }
        window.location.href = `${base}aliya-profile-guest.html`;
      });
    }

    document.body.classList.add("nav_ready");
  }

  renderNav(isLogged);
});

// === 5️⃣ Когда пользователь успешно вошёл (пример) ===
// Вставь этот код в место, где логин проходит успешно:
function loginSuccess() {
  const user = { loggedIn: true };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");
  window.location.href = "aliya-profile.html";
}
