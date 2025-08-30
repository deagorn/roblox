// sidebar.js — меню відкрито з першого завантаження, кнопка одразу "−".
// Без збереження станів. Стійко до відкладеного рендеру/інших скриптів.

(function () {
  const SEL = {
    container: "#learning-menu",
    menu: "#learning-menu .dropdown-menu",
    btn: ".toggle-btn",
  };

  const $ = (s, root = document) => root.querySelector(s);
  const visible = (el) =>
    !!el && window.getComputedStyle(el).display !== "none";

  function openMenu(menu, btn) {
    if (!menu) return;
    // спроба через inline-стиль
    menu.style.display = "block";
    // продублюємо стан класом контейнера (на випадок CSS-пріоритетів)
    const container = $(SEL.container);
    if (container) container.classList.add("is-open");
    syncButton(menu, btn);
  }

  function closeMenu(menu, btn) {
    if (!menu) return;
    menu.style.display = "none";
    const container = $(SEL.container);
    if (container) container.classList.remove("is-open");
    syncButton(menu, btn);
  }

  function syncButton(menu, btn) {
    if (!btn) return;
    btn.textContent = visible(menu) ? "−" : "+";
  }

  // Глобальна — для inline onclick на кнопці
  window.toggleMenu = function (e) {
    const menu = $(SEL.menu);
    const btn = $(SEL.btn);
    if (!menu) return;

    // Якщо клік випадково прийшов із <a>, не блокуємо навігацію
    if (e && e.currentTarget && e.currentTarget.tagName === "A") return;

    if (visible(menu)) closeMenu(menu, btn);
    else openMenu(menu, btn);
  };

  // Чекаємо появу елементів і одразу відкриваємо меню
  function ensureOpenedOnceReady() {
    const btn = $(SEL.btn);
    const menu = $(SEL.menu);

    if (menu) {
      openMenu(menu, btn); // відкрили + виставили "−"
      return true;
    }
    return false;
  }

  // Тримаємо кнопку синхронізованою, навіть якщо DOM змінюється
  function observeSync() {
    const container = $(SEL.container);
    if (!container) return;

    const mo = new MutationObserver(() => {
      const menu = $(SEL.menu);
      const btn = $(SEL.btn);
      if (!menu || !btn) return;
      // якщо щось змінилось — просто синхронізуємо
      syncButton(menu, btn);
    });

    mo.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // невеликий стабілізуючий інтервал на перші пів секунди, щоб перебити пізні ініціалізації
    let tries = 0;
    const id = setInterval(() => {
      const menu = $(SEL.menu);
      const btn = $(SEL.btn);
      if (menu) {
        openMenu(menu, btn); // гарант — меню відкрите, кнопка "−"
      }
      if (++tries >= 5) clearInterval(id); // ~500мс (кожні 100мс)
    }, 100);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Якщо меню вже є — відкриємо. Якщо ще ні — дочекаємось.
    if (!ensureOpenedOnceReady()) {
      const mo = new MutationObserver(() => {
        if (ensureOpenedOnceReady()) mo.disconnect();
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
      // страховка: зняти спостереження через 5с
      setTimeout(() => mo.disconnect(), 5000);
    }

    observeSync();

    // Додатково повісимо слухач на кнопку (разом із inline — не конфліктує)
    const btn = $(SEL.btn);
    if (btn) btn.addEventListener("click", window.toggleMenu);
  });
})();
