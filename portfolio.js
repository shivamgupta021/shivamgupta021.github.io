const themeButton = document.querySelector(".theme");
const root = document.documentElement;

function isDark() {
  return root.dataset.theme === "dark";
}

function updateThemeButton() {
  themeButton.setAttribute("aria-pressed", String(isDark()));
}

themeButton.addEventListener("click", () => {
  const theme = isDark() ? "light" : "dark";
  root.dataset.theme = theme;
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    // The selection still applies until this page is closed.
  }
  updateThemeButton();
});

updateThemeButton();
themeButton.hidden = false;

function trackLink(event) {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const url = new URL(link.href);
  let destination;
  if (link.dataset.track === "resume_click") {
    destination = "Résumé (PDF)";
  } else if (url.protocol === "mailto:" || url.protocol === "tel:") {
    destination = url.protocol === "mailto:" ? "Email" : "Phone";
  } else if (url.protocol === "https:" || url.protocol === "http:") {
    const host = url.origin === location.origin ? "" : url.hostname.replace(/^www\./, "");
    destination = host + url.pathname.replace(/\/$/, "") || "/";
  } else {
    return;
  }
  window.umami?.track("link_click", { destination });
}

document.addEventListener("click", trackLink);
document.addEventListener("auxclick", event => {
  if (event.button === 1) trackLink(event);
});
