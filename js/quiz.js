// ============================================
// CROWNED READS — Quiz Logic
// Module 2 (objects/arrays), Module 4 (loops/if),
// Module 5 (functions), Module 6 (try/catch)
// ============================================

// --- DATA: Questions array (Module 2: arrays + objects) ---
const questions = [
  {
    text: "What kind of evening calls to you?",
    answers: [
      { text: "A grand ball with masked strangers and forbidden games", book: "caraval" },
      { text: "Whispered fairy tales told by candlelight", book: "once-upon" },
      { text: "Sparring with a stubborn rival under the stars", book: "fourth-wing" },
      { text: "Stargazing in a court where the night never ends", book: "acotar" }
    ]
  },
  {
    text: "Which power would you choose?",
    answers: [
      { text: "Bending reality like a magician on stage", book: "caraval" },
      { text: "Making impossible wishes come true (for a price)", book: "once-upon" },
      { text: "Bonding with a creature of fire and storm", book: "fourth-wing" },
      { text: "Wielding ancient elemental magic through bloodlines", book: "acotar" }
    ]
  },
  {
    text: "Your love story starts with...",
    answers: [
      { text: "A cryptic letter and a missing sister", book: "caraval" },
      { text: "A bargain you should never have made", book: "once-upon" },
      { text: "An enemy who threatens your life on day one", book: "fourth-wing" },
      { text: "A creature dragging you into another world", book: "acotar" }
    ]
  },
  {
    text: "What scares you most?",
    answers: [
      { text: "Losing someone to a game you don't understand", book: "caraval" },
      { text: "A heart that won't stop wishing", book: "once-upon" },
      { text: "Failing in front of those who already wrote you off", book: "fourth-wing" },
      { text: "The cold loneliness of being chosen", book: "acotar" }
    ]
  },
  {
    text: "Pick a weapon for the road:",
    answers: [
      { text: "A deck of marked cards", book: "caraval" },
      { text: "A locket holding three impossible wishes", book: "once-upon" },
      { text: "A dagger sharpened on a dragon's scale", book: "fourth-wing" },
      { text: "An ash arrow blessed by a high lord", book: "acotar" }
    ]
  }
];

// --- DATA: Results (Module 2: object) ---
const results = {
  "caraval": {
    title: "You belong to Caraval",
    subtitle: "The world of velvet, masks, and impossible games",
    description: "You're drawn to mystery and the thrill of not knowing what's real. You'd thrive in Stephanie Garber's enchanted carnival, where every illusion hides a deeper truth.",
    book: "Caraval by Stephanie Garber"
  },
  "once-upon": {
    title: "You belong to the Magnificent North",
    subtitle: "Where wishes come true — for a price",
    description: "You believe in fairy tales, but the dark and complicated kind. The Prince of Hearts has been waiting for someone exactly like you to bargain with.",
    book: "Once Upon a Broken Heart by Stephanie Garber"
  },
  "fourth-wing": {
    title: "You belong at Basgiath War College",
    subtitle: "Where dragons choose, and only the fierce survive",
    description: "You don't run from challenge — you sharpen yourself against it. Violet's brutal academy and the bond between rider and dragon was made for someone like you.",
    book: "Fourth Wing by Rebecca Yarros"
  },
  "acotar": {
    title: "You belong to the Night Court",
    subtitle: "Stars, courts, and a love that rebuilds worlds",
    description: "You love deeply, ferociously, and you'd reshape entire kingdoms for the people you cherish. Velaris is calling you home.",
    book: "A Court of Thorns and Roses by Sarah J. Maas"
  }
};

// --- STATE (Module 2: variables) ---
let currentQuestion = 0;
let scores = { "caraval": 0, "once-upon": 0, "fourth-wing": 0, "acotar": 0 };

// --- DOM ELEMENTS ---
const introScreen = document.getElementById("quiz-intro");
const questionScreen = document.getElementById("quiz-question");
const resultScreen = document.getElementById("quiz-result");
const startBtn = document.getElementById("quiz-start");
const restartBtn = document.getElementById("quiz-restart");
const progressEl = document.getElementById("quiz-progress");
const questionTextEl = document.getElementById("quiz-question-text");
const optionsEl = document.getElementById("quiz-options");

// --- ATTACH BUTTON LISTENERS ---
// We only attach if the elements exist (we're on the quiz page)
if (startBtn) {
  startBtn.addEventListener("click", startQuiz);
}
if (restartBtn) {
  restartBtn.addEventListener("click", restartQuiz);
}


// ============================================
// FUNCTIONS (Module 5)
// ============================================

function startQuiz() {
  console.log("Quiz started ✦");
  currentQuestion = 0;
  scores = { "caraval": 0, "once-upon": 0, "fourth-wing": 0, "acotar": 0 };

  introScreen.hidden = true;
  resultScreen.hidden = true;
  questionScreen.hidden = false;

  showQuestion(currentQuestion);
}

function showQuestion(index) {
  try {
    const q = questions[index];

    progressEl.textContent = "Question " + (index + 1) + " of " + questions.length;
    questionTextEl.textContent = q.text;
    optionsEl.innerHTML = ""; // clear previous options

    // Module 4: for loop to render answer buttons
    for (let i = 0; i < q.answers.length; i++) {
      const answer = q.answers[i];
      const btn = document.createElement("button");
      btn.className = "quiz__option";
      btn.textContent = answer.text;
      btn.dataset.book = answer.book;

      btn.addEventListener("click", function () {
        handleAnswer(answer.book);
      });

      optionsEl.appendChild(btn);
    }
  } catch (error) {
    console.error("Could not show question:", error);
  }
}

function handleAnswer(book) {
  // Module 4: if/else — but here a simple increment is enough
  scores[book] = scores[book] + 1;
  console.log("Answered →", book, "| Scores:", scores);

  currentQuestion = currentQuestion + 1;

  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
}

function showResult() {
  // Find the book with the highest score (Module 4: for + if)
  let topBook = "caraval";
  let topScore = 0;

  // Use for...in to loop through object keys
  for (const book in scores) {
    if (scores[book] > topScore) {
      topScore = scores[book];
      topBook = book;
    }
  }

  const result = results[topBook];
  console.log("Result:", topBook, "| Final scores:", scores);

  document.getElementById("quiz-result-title").textContent = result.title;
  document.getElementById("quiz-result-subtitle").textContent = result.subtitle;
  document.getElementById("quiz-result-text").textContent = result.description;
  document.getElementById("quiz-result-book").textContent = result.book;

  questionScreen.hidden = true;
  resultScreen.hidden = false;
}

function restartQuiz() {
  resultScreen.hidden = true;
  introScreen.hidden = false;
}