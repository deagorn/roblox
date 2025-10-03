// html.js - Універсальний завантажувач контенту для html.html

/**
 * ІНСТРУКЦІЯ ПО ВИКОРИСТАННЮ:
 *
 * 1. Щоб додати нову сторінку для завантаження:
 *    - Додайте новий об'єкт в масив AVAILABLE_PAGES з такими параметрами:
 *      {
 *        id: "унікальний-ідентифікатор",
 *        filename: "назва-файлу.html",
 *        title: "Назва сторінки для відображення",
 *        container: "#id-контейнера" // де завантажувати контент
 *      }
 *
 * 2. Щоб додати новий контейнер в html.html:
 *    - Додайте <div id="назва-контейнера"></div> в html.html
 *    - Вкажіть цей селектор в параметрі container
 *
 * 3. Для навігації між сторінками:
 *    - Використовуйте функцію loadPage("id-сторінки")
 *    - Або додайте параметр ?page=id-сторінки в URL
 */

// Конфігурація доступних сторінок
const AVAILABLE_PAGES = [
  {
    id: "acquaintance",
    filename: "acquaintance.html",
    title: "Основні принципи роботи",
    container: "#acquaintance",
  },
  {
    id: "advanced",
    filename: "advanced.html",
    title: "Поглиблений HTML",
    container: "#base-content",
  },
  // 📝 ДОДАВАЙТЕ НОВІ СТОРІНКИ ТУТ:
  // {
  //   id: "forms",
  //   filename: "forms.html",
  //   title: "HTML Форми",
  //   container: "#base-content"
  // },
  // {
  //   id: "tables",
  //   filename: "tables.html",
  //   title: "HTML Таблиці",
  //   container: "#base-content"
  // }
];

// Конфігурація шляхів
const PATHS = {
  htmlFolder: "./", // Папка з HTML файлами відносно html.html
  defaultPage: "acquaintance", // Сторінка за замовчуванням
};

/**
 * Завантажує контент сторінки
 * @param {string} pageId - ID сторінки з масиву AVAILABLE_PAGES
 * @param {boolean} updateUrl - Чи оновлювати URL (за замовчуванням true)
 */
function loadPage(pageId, updateUrl = true) {
  const page = AVAILABLE_PAGES.find((p) => p.id === pageId);

  if (!page) {
    console.error(`Сторінку з ID "${pageId}" не знайдено`);
    return;
  }

  const container = document.querySelector(page.container);
  if (!container) {
    console.error(`Контейнер "${page.container}" не знайдено`);
    return;
  }

  // Показуємо індикатор завантаження
  container.innerHTML = '<div class="loading">Завантаження...</div>';

  // Завантажуємо контент
  fetch(PATHS.htmlFolder + page.filename)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      container.innerHTML = data;

      // Оновлюємо заголовок сторінки
      document.title = page.title;

      // Оновлюємо URL якщо потрібно
      if (updateUrl) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("page", pageId);
        window.history.pushState({ pageId }, page.title, newUrl);
      }

      // Виправляємо посилання після завантаження контенту
      fixContentLinks(container);

      // Викликаємо кастомну функцію після завантаження (якщо існує)
      if (typeof onPageLoaded === "function") {
        onPageLoaded(pageId, container);
      }

      console.log(`✅ Сторінку "${page.title}" завантажено успішно`);
    })
    .catch((error) => {
      console.error("❌ Помилка завантаження:", error);
      container.innerHTML = `
        <div class="error">
          <h3>Помилка завантаження</h3>
          <p>Не вдалося завантажити контент: ${error.message}</p>
          <button onclick="loadPage('${pageId}')">Спробувати ще раз</button>
        </div>
      `;
    });
}

/**
 * Виправляє посилання на зображення та інші ресурси після завантаження контенту
 * @param {HTMLElement} container - Контейнер з завантаженим контентом
 */
function fixContentLinks(container) {
  // Виправляємо шляхи до зображень
  const images = container.querySelectorAll('img[src^="../"]');
  images.forEach((img) => {
    const currentSrc = img.getAttribute("src");
    // Видаляємо один рівень ../ оскільки ми вже в папці HTML
    const newSrc = currentSrc.replace("../", "");
    img.setAttribute("src", newSrc);
  });

  // Виправляємо внутрішні посилання
  const links = container.querySelectorAll('a[href^="../"]');
  links.forEach((link) => {
    const currentHref = link.getAttribute("href");
    const newHref = currentHref.replace("../", "");
    link.setAttribute("href", newHref);
  });

  // 📝 ДОДАВАЙТЕ ІНШІ ВИПРАВЛЕННЯ ПОСИЛАНЬ ТУТ:
  // Наприклад, для CSS файлів, JS файлів тощо
}

/**
 * Отримує ID сторінки з URL параметрів
 * @returns {string} ID сторінки або значення за замовчуванням
 */
function getPageFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("page") || PATHS.defaultPage;
}

/**
 * Обробляє зміни в історії браузера (кнопки Назад/Вперед)
 */
function handlePopState(event) {
  const pageId = event.state?.pageId || getPageFromUrl();
  loadPage(pageId, false); // Не оновлюємо URL при навігації назад/вперед
}

/**
 * Ініціалізація при завантаженні сторінки
 */
function initPageLoader() {
  // Обробляємо навігацію браузера
  window.addEventListener("popstate", handlePopState);

  // Обробляємо кліки по посиланнях з параметром page в sidebar
  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href*="?page="]');
    if (link && link.href.includes("html.html?page=")) {
      e.preventDefault();
      const url = new URL(link.href);
      const pageId = url.searchParams.get("page");
      const hash = url.hash;

      if (pageId) {
        // Оновлюємо URL з якорем якщо він є
        if (hash) {
          window.location.hash = hash;
        }
        loadPage(pageId);
      }
    }
  });

  // Завантажуємо початкову сторінку
  const initialPage = getPageFromUrl();
  loadPage(initialPage, false); // Не оновлюємо URL при першому завантаженні

  console.log("🚀 Завантажувач сторінок ініціалізовано");
}

// 📝 КАСТОМНІ ФУНКЦІЇ (ДОДАВАЙТЕ ЗА ПОТРЕБИ):

/**
 * Функція, що викликається після завантаження кожної сторінки
 * Розкоментуйте та налаштуйте за потреби
 */
function onPageLoaded(pageId, container) {
  console.log(`Сторінка ${pageId} завантажена`);

  // Оновлюємо активну кнопку навігації
  updateActiveNavButton(pageId);

  // Прокручуємо до потрібного елементу якщо є якір в URL
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const element = container.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }
}

/**
 * Оновлює активну кнопку в навігації
 * @param {string} activePageId - ID активної сторінки
 */
function updateActiveNavButton(activePageId) {
  // Прибираємо клас active з усіх кнопок
  const navButtons = document.querySelectorAll(".page-navigation button");
  navButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Додаємо клас active до відповідної кнопки
  const activeButton = document.querySelector(
    `button[onclick="loadPage('${activePageId}')"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

/**
 * Функція для створення навігаційного меню
 * Розкоментуйте щоб додати автоматичне меню
 */

// function createNavigation() {
//   const nav = document.createElement('nav');
//   nav.className = 'page-navigation';
//
//   AVAILABLE_PAGES.forEach(page => {
//     const button = document.createElement('button');
//     button.textContent = page.title;
//     button.onclick = () => loadPage(page.id);
//     nav.appendChild(button);
//   });
//
//   // Додаємо меню в початок контенту
//   const mainContent = document.querySelector('.main-content');
//   mainContent.insertBefore(nav, mainContent.firstChild);
// }

// Експортуємо функції для глобального використання
window.loadPage = loadPage;
window.initPageLoader = initPageLoader;

// Автоматична ініціалізація при завантаженні DOM
document.addEventListener("DOMContentLoaded", function () {
  // Невелика затримка для завантаження sidebar
  setTimeout(initPageLoader, 150);
});
