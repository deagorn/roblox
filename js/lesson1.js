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
