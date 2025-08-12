// sidebar.js

// Функція для збереження стану меню
function saveMenuState(menuId, isOpen) {
  localStorage.setItem(`menu_${menuId}`, isOpen);
}

// Функція для відновлення стану меню (зробимо глобальною)
window.restoreMenuStates = function () {
  // Визначаємо на якій сторінці ми знаходимося
  const currentPath = window.location.pathname;
  const isIntroductionPage = currentPath.includes("Introduction.html");
  const isHtmlPage = currentPath.includes("html.html");
  const isBasePage = currentPath.includes("base.html");

  const menus = [
    {
      menuClass: ".dropdown-menu",
      buttonClass: ".toggle-btn",
      storageKey: "menu_1",
      shouldShowOnPage: isIntroductionPage, // Показувати тільки на Introduction
    },
    {
      menuClass: ".dropdown-menu2",
      buttonClass: ".toggle-btn2",
      storageKey: "menu_2",
      shouldShowOnPage: isHtmlPage, // Показувати тільки на html.html
    },
    {
      menuClass: ".dropdown-menu3",
      buttonClass: ".toggle-btn3",
      storageKey: "menu_3",
      shouldShowOnPage: isBasePage, // Показувати тільки на base.html
    },
  ];

  menus.forEach((menu) => {
    const isOpen = localStorage.getItem(menu.storageKey) === "true";
    const dropdownMenu = document.querySelector(menu.menuClass);
    const toggleButton = document.querySelector(menu.buttonClass);

    if (dropdownMenu) {
      if (isOpen && menu.shouldShowOnPage) {
        // Відкриваємо меню тільки якщо ми на правильній сторінці
        dropdownMenu.style.display = "block";
        if (toggleButton) {
          toggleButton.textContent = "-";
          toggleButton.classList.add("force-show"); // Додаємо клас для показу
        }
      } else if (isOpen && !menu.shouldShowOnPage) {
        // Меню відкрите, але ми не на правильній сторінці - показуємо кнопку для закриття
        dropdownMenu.style.display = "block";
        if (toggleButton) {
          toggleButton.textContent = "-";
          toggleButton.classList.add("force-show"); // Додаємо клас для показу
        }
      } else {
        // Закриваємо меню
        dropdownMenu.style.display = "none";
        if (toggleButton) {
          toggleButton.textContent = "+";
          toggleButton.classList.remove("force-show"); // Прибираємо клас
        }
      }
    }
  });
};

function toggleMenu() {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const toggleButton = document.querySelector(".toggle-btn");

  // Перевіряємо, чи існують елементи
  if (!dropdownMenu) return;

  // Перевіряємо, чи меню відкрите або закрите
  if (
    dropdownMenu.style.display === "none" ||
    dropdownMenu.style.display === ""
  ) {
    dropdownMenu.style.display = "block"; // Розгортаємо меню
    if (toggleButton) {
      toggleButton.textContent = "-"; // Міняємо знак на "-"
      toggleButton.classList.add("force-show"); // Показуємо кнопку
    }
    saveMenuState("1", true);
  } else {
    dropdownMenu.style.display = "none"; // Згортаємо меню
    if (toggleButton) {
      toggleButton.textContent = "+"; // Міняємо знак на "+"
      toggleButton.classList.remove("force-show"); // Прибираємо примусовий показ
    }
    saveMenuState("1", false);
  }
}

function toggleMenu2() {
  const dropdownMenu = document.querySelector(".dropdown-menu2");
  const toggleButton = document.querySelector(".toggle-btn2");

  // Перевіряємо, чи існують елементи
  if (!dropdownMenu) return;

  // Перевіряємо, чи меню відкрите або закрите
  if (
    dropdownMenu.style.display === "none" ||
    dropdownMenu.style.display === ""
  ) {
    dropdownMenu.style.display = "block"; // Розгортаємо меню
    if (toggleButton) {
      toggleButton.textContent = "-"; // Міняємо знак на "-"
      toggleButton.classList.add("force-show"); // Показуємо кнопку
    }
    saveMenuState("2", true);
  } else {
    dropdownMenu.style.display = "none"; // Згортаємо меню
    if (toggleButton) {
      toggleButton.textContent = "+"; // Міняємо знак на "+"
      toggleButton.classList.remove("force-show"); // Прибираємо примусовий показ
    }
    saveMenuState("2", false);
  }
}

function toggleMenu3() {
  const dropdownMenu = document.querySelector(".dropdown-menu3");
  const toggleButton = document.querySelector(".toggle-btn3");

  // Перевіряємо, чи існують елементи
  if (!dropdownMenu) return;

  // Перевіряємо, чи меню відкрите або закрите
  if (
    dropdownMenu.style.display === "none" ||
    dropdownMenu.style.display === ""
  ) {
    dropdownMenu.style.display = "block"; // Розгортаємо меню
    if (toggleButton) {
      toggleButton.textContent = "-"; // Міняємо знак на "-"
      toggleButton.classList.add("force-show"); // Показуємо кнопку
    }
    saveMenuState("3", true);
  } else {
    dropdownMenu.style.display = "none"; // Згортаємо меню
    if (toggleButton) {
      toggleButton.textContent = "+"; // Міняємо знак на "+"
      toggleButton.classList.remove("force-show"); // Прибираємо примусовий показ
    }
    saveMenuState("3", false);
  }
}

// Відновлюємо стан меню при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  // Невелика затримка для завантаження sidebar
  setTimeout(function () {
    window.restoreMenuStates();
    window.setupAnchorLinks();
  }, 200);
});

// Функція для налаштування якорних посилань (зробимо глобальною)
window.setupAnchorLinks = function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};
