document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion").forEach(initAccordion);

  function initAccordion(root) {
    const items = [...root.querySelectorAll(".accordion__item")];
    const headers = [...root.querySelectorAll(".accordion__header")];
    const allowMultiple = root.hasAttribute("data-multiple"); // опційно

    // Ініціалізація згідно з aria-expanded / hidden у твоїй розмітці
    items.forEach((item) => syncItem(item));

    headers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".accordion__item");
        const expanded = item.getAttribute("aria-expanded") === "true";

        if (!allowMultiple && !expanded) {
          items.forEach((i) => {
            if (i !== item) setExpanded(i, false);
          });
        }
        setExpanded(item, !expanded);
      });

      // Мінімальна підтримка клавіатури
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  function setExpanded(item, expanded) {
    const btn = item.querySelector(".accordion__header");
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const chev = btn.querySelector(".accordion__chev");

    item.setAttribute("aria-expanded", String(expanded));
    btn.setAttribute("aria-expanded", String(expanded));
    if (panel) panel.hidden = !expanded; // працює разом із [hidden]{display:none!important}
    if (chev) chev.textContent = expanded ? "▲" : "▼";
  }

  function syncItem(item) {
    const btn = item.querySelector(".accordion__header");
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const expanded =
      item.getAttribute("aria-expanded") === "true" ||
      btn.getAttribute("aria-expanded") === "true";
    item.setAttribute("aria-expanded", String(expanded));
    btn.setAttribute("aria-expanded", String(expanded));
    if (panel) panel.hidden = !expanded;
    const chev = btn.querySelector(".accordion__chev");
    if (chev) chev.textContent = expanded ? "▲" : "▼";
  }
});
