try {
  const theme = localStorage.getItem("portfolio-theme");
  if (theme === "dark" || theme === "light") {
    document.documentElement.dataset.theme = theme;
  }
} catch {
  // Use the default dark theme when storage is unavailable.
}
