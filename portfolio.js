function trackLink(event) {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const url = new URL(link.href);
  let destination;
  if (link.dataset.track === "resume_click") {
    destination = "Résumé (PDF)";
  } else if (url.origin === location.origin && url.pathname === location.pathname && url.hash) {
    destination = url.hash;
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
