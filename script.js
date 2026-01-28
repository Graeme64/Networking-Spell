let currentItem = null;
let missingIndex = null;

const acronymTextEl = document.getElementById("acronym-text");
const phraseDisplayEl = document.getElementById("phrase-display");
const answerInputEl = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function pickRandomAcronym() {
  const index = getRandomInt(acronyms.length);
  return acronyms[index];
}

function renderNewQuestion() {
  currentItem = pickRandomAcronym();
  const words = currentItem.words;
  missingIndex = getRandomInt(words.length);

  acronymTextEl.textContent = currentItem.acronym;
  phraseDisplayEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  answerInputEl.value = "";
  answerInputEl.focus();

  words.forEach((word, idx) => {
    const span = document.createElement("span");
    span.classList.add("phrase-word");
    if (idx === missingIndex) {
      span.classList.add("blank");
      span.textContent = "_____";
    } else {
      span.textContent = word;
    }
    phraseDisplayEl.appendChild(span);
  });
}

function checkAnswer() {
  if (!currentItem) return;

  const userAnswer = answerInputEl.value.trim();
  const correctWord = currentItem.words[missingIndex];

  if (!userAnswer) {
    feedbackEl.textContent = "Type a word first.";
    feedbackEl.className = "feedback incorrect";
    return;
  }

  if (userAnswer.toLowerCase() === correctWord.toLowerCase()) {
    feedbackEl.textContent = `Correct! The full phrase is "${currentItem.words.join(" ")}".`;
    feedbackEl.className = "feedback correct";
  } else {
    feedbackEl.textContent = `Not quite. Correct word: "${correctWord}". Full phrase: "${currentItem.words.join(" ")}".`;
    feedbackEl.className = "feedback incorrect";
  }
}

submitBtn.addEventListener("click", checkAnswer);

answerInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

nextBtn.addEventListener("click", renderNewQuestion);

// Start the first question
renderNewQuestion();
