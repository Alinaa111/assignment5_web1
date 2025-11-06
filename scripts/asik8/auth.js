document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const inPages = window.location.pathname.includes("/pages/");
  const base = inPages ? "" : "pages/";

  const navRight = document.querySelectorAll(".nav_right");
  const asides = document.querySelectorAll("aside nav ul");

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

    asides.forEach(ul => {
      let found = false;
      ul.querySelectorAll("li a").forEach(a => {
        if (a.textContent.trim().toLowerCase().startsWith("profile")) {
          found = true;
          if (isLogged) {
            a.href = `${base}aliya-profile.html`;
            a.textContent = "Profile";
          } else {
            a.href = `${base}aliya-profile-guest.html`;
            a.textContent = "Profile";
          }
        }

        if (a.href && a.href.includes("aliya-login.html")) {
          a.style.display = isLogged ? "none" : "block";
        }
      });

      if (!found) {
        if (isLogged) {
          ul.insertAdjacentHTML(
            "beforeend",
            `<li><a href="${base}aliya-profile.html">Profile</a></li>`
          );
        } else {
          ul.insertAdjacentHTML(
            "beforeend",
            `<li><a href="${base}aliya-profile-guest.html">Profile</a></li>`
          );
        }
      }
    });

    // Logout
    const logoutTop = document.getElementById("logoutTop");
    if (logoutTop) {
      logoutTop.addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem("loggedIn");
        const u = JSON.parse(localStorage.getItem("user"));
        if (u) {
          delete u.loggedIn;
          localStorage.setItem("user", JSON.stringify(u));
        }
       
        window.location.href = `${base}aliya-profile-guest.html`;
      });
    }
  }

  const isLogged = !!(user && user.loggedIn);
  renderNav(isLogged);
});
