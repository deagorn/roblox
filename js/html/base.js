// Правильні відповіді для обох тестів
const correctAnswers = {
  // Тест 1
  test8: {
    q8_1: "B",
    q8_2: "C",
    q8_3: "A",
    q8_4: "B",
    q8_5: "D",
  },
  // Тест 2
};

// Універсальна функція для перевірки тестів
function checkQuizGeneral(testName, questionNames, resultDivId) {
  let correctCount = 0;
  let totalQuestions = questionNames.length;
  const answers = correctAnswers[testName];

  // Очищаємо попередні результати ТІЛЬКИ для цього тесту
  questionNames.forEach((questionName) => {
    const allOptions = document.querySelectorAll(
      `input[name="${questionName}"]`
    );
    allOptions.forEach((option) => {
      option.parentElement.classList.remove(
        "answer-correct",
        "answer-incorrect"
      );
    });
  });

  // Перевіряємо кожне запитання
  questionNames.forEach((questionName) => {
    const selectedAnswer = document.querySelector(
      `input[name="${questionName}"]:checked`
    );
    const allOptions = document.querySelectorAll(
      `input[name="${questionName}"]`
    );

    if (selectedAnswer) {
      const selectedValue = selectedAnswer.value;
      const correctValue = answers[questionName];

      // Знаходимо правильну відповідь і підсвічуємо її зеленим
      allOptions.forEach((option) => {
        if (option.value === correctValue) {
          option.parentElement.classList.add("answer-correct");
        }
      });

      // Якщо відповідь правильна, збільшуємо лічільник
      if (selectedValue === correctValue) {
        correctCount++;
      } else {
        // Якщо відповідь неправильна, підсвічуємо червоним
        selectedAnswer.parentElement.classList.add("answer-incorrect");
      }
    }
  });

  // Показуємо результат
  const resultDiv = document.getElementById(resultDivId);
  resultDiv.style.display = "block";

  if (correctCount === totalQuestions) {
    resultDiv.className = "quiz-result correct-result";
    resultDiv.innerHTML =
      "🎉 Молодець! Правильна відповідь! Ти відповів правильно на всі запитання!";
  } else {
    resultDiv.className = "quiz-result incorrect-result";
    resultDiv.innerHTML = `❌ Ти помилився! Правильних відповідей: ${correctCount} з ${totalQuestions}. Спробуй ще раз!`;
  }

  // Блокуємо всі радіокнопки цього тесту після перевірки
  questionNames.forEach((questionName) => {
    document
      .querySelectorAll(`input[name="${questionName}"]`)
      .forEach((radio) => {
        radio.disabled = true;
      });
  });

  // Знаходимо кнопку цього тесту та блокуємо її
  const submitButton = resultDiv
    .closest(".quiz-section")
    .querySelector(".submit-quiz");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.6";
    submitButton.style.cursor = "not-allowed";
  }

  // Прокручуємо до результату
  resultDiv.scrollIntoView({ behavior: "smooth" });
}

// Функція для першого тесту
function checkQuiz8() {
  const questions = ["q8_1", "q8_2", "q8_3", "q8_4", "q8_5"];
  checkQuizGeneral("test8", questions, "quiz-result-8");
}
