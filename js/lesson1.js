function showSection(section) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Show the selected section
  const selectedSection = document.getElementById(section);
  if (selectedSection) {
    selectedSection.style.display = "block";
  }
}

// Show the "theory" section by default
showSection("theory");

// новий код для lesson1.js
//
//
// Функція для плавного скролу
// Функція для плавного скролу (працює по ID)
function scrollToElement(id) {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}

// Функція копіювання коду
function copyCode() {
  const codeText = document.getElementById("lua-code").innerText;

  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      const btn = document.querySelector(".copy-btn");
      const originalText = btn.innerText;

      btn.innerText = "Скопійовано! 🎉";
      btn.style.backgroundColor = "#27ae60";

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "#16a085";
      }, 2000);
    })
    .catch((err) => {
      console.error("Не вдалося скопіювати: ", err);
    });
}

console.log("Всі класи успішно оновлено! 🚀");
