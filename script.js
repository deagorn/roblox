// Завантаження бокової панелі на сторінки
// Визначаємо правильний шлях залежно від поточної сторінки
function getSidebarPath() {
  var currentPath = window.location.pathname;

  // Якщо ми знаходимося в папці HTML
  if (currentPath.includes("/HTML/")) {
    return "./sidebar.html";
  } else {
    // Якщо ми в корені
    return "./HTML/sidebar.html";
  }
}

fetch(getSidebarPath())
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("sidebar-container").innerHTML = data;

    // Fix sidebar links after loading
    fixSidebarLinks();

    // After sidebar is loaded, check if we need to hide the learning menu
    // Add a small delay to ensure DOM is fully updated
    setTimeout(() => {
      hideLearningMenuIfNotPage1();
      highlightActivePage(); // Додаємо підсвічування активної сторінки

      // Відновлюємо стан меню після завантаження sidebar
      if (typeof window.restoreMenuStates === "function") {
        window.restoreMenuStates();
      }

      // Налаштовуємо якорні посилання
      if (typeof window.setupAnchorLinks === "function") {
        window.setupAnchorLinks();
      }
    }, 100);
  })
  .catch((error) => {
    console.error("Error loading sidebar:", error);
  });

// Function to fix sidebar links based on current location
function fixSidebarLinks() {
  var currentPath = window.location.pathname;
  var isInRoot = !currentPath.includes("/HTML/");

  // Get all sidebar links
  var sidebarLinks = document.querySelectorAll(".sidebar a[href]");

  sidebarLinks.forEach(function (link) {
    var href = link.getAttribute("href");

    // Skip anchor links and javascript links
    if (href.startsWith("#") || href.startsWith("javascript:")) {
      return;
    }

    if (isInRoot) {
      // If we're in root (index.html), fix the links
      if (href === "../HTML/Introduction.html") {
        link.setAttribute("href", "./HTML/Intro.html");
      } else if (href === "../HTML/Intro.html") {
        link.setAttribute("href", "./HTML/Intro.html");
      } else if (href === "../HTML/page1.html") {
        link.setAttribute("href", "./HTML/page1.html");
      } else if (href === "../HTML/page1.html") {
        link.setAttribute("href", "./HTML/page1.html");
      } else if (href === "../HTML/page2.html") {
        link.setAttribute("href", "./HTML/page2.html");
      } else if (href === "../HTML/page3.html") {
        link.setAttribute("href", "./HTML/page3.html");
      }
      // Keep '../index.html' as is - it's incorrect for root but won't be used
      if (href === "../index.html") {
        link.setAttribute("href", "./index.html");
      }
    }
    // If we're in HTML folder, links should work as they are
  });
}

// Function to hide learning menu if not on page1.html
function hideLearningMenuIfNotPage1() {
  // CSS handles the hiding/showing, but we can add additional logic here if needed
  var currentPage = window.location.pathname.split("/").pop();

  // The CSS rules will automatically show/hide based on body class
  // This function now just logs for debugging
}

// Function to highlight active page in sidebar
function highlightActivePage() {
  var currentPage = window.location.pathname.split("/").pop();
  var currentPath = window.location.pathname;

  // Remove active class from all links
  var allLinks = document.querySelectorAll(".sidebar a");
  allLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  // Add active class to current page link
  var activeLink = null;

  // Check for specific pages
  if (currentPage === "index.html" || currentPath.endsWith("/")) {
    activeLink = document.querySelector(
      '.sidebar a[href="./index.html"], .sidebar a[href="../index.html"]'
    );
  } else if (currentPage === "Introduction.html") {
    activeLink = document.querySelector(
      '.sidebar a[href="./HTML/Introduction.html"], .sidebar a[href="../HTML/Introduction.html"]'
    );
  } else if (currentPage === "Intro.html") {
    activeLink = document.querySelector(
      '.sidebar a[href="./HTML/Intro.html"], .sidebar a[href="../HTML/Intro.html"]'
    );
  } else if (currentPage === "page1.html") {
    activeLink = document.querySelector(
      '.sidebar a[href="./HTML/page1.html"], .sidebar a[href="../HTML/page1.html"]'
    );
  } else if (currentPage === "page2.html") {
    activeLink = document.querySelector(
      '.sidebar a[href="./HTML/page2.html"], .sidebar a[href="../HTML/page2.html"]'
    );
  } else if (currentPage === "page3.html") {
    activeLink = document.querySelector(
      '.sidebar a[href="./HTML/page3.html"], .sidebar a[href="../HTML/page3.html"]'
    );
  }

  // Add active class if link found
  if (activeLink) {
    activeLink.classList.add("active");
  }
}
