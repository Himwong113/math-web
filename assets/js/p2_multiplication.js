// assets/js/p2_multiplication.js

const livesEl    = document.getElementById('lives');
const lifeIcons  = () => Array.from(livesEl.querySelectorAll('.life'));
const counterEl  = document.getElementById('counter');
const scoreEl    = document.getElementById('score');  // Score display element
const questionEl = document.getElementById('question');
const optionsEl  = document.getElementById('options');

let correctAnswer;
let questionCount = 0;
let lives        = 3;
let score        = 0;  // Track correct answers

/**
 * Shuffle array in place (Fisher–Yates)
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Update heart icons to reflect remaining lives.
 */
function updateLivesDisplay() {
  lifeIcons().forEach((el, idx) => {
    el.classList.toggle('lost', idx >= lives);
  });
}

/**
 * End the game and navigate back to index.
 */
function gameOver() {
  alert(`Game Over! Your score: ${score}`);
  window.location.href = 'index.html';
}

/**
 * Load a new question: always operand blank format a × __ = result
 */
function loadQuestion() {
  // If no lives left, game over
  if (lives < 1) return gameOver();

  questionCount++;
  counterEl.textContent = `Question: ${questionCount}`;
  optionsEl.innerHTML   = '';

  // Generate two random 1-digit numbers
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const result = a * b;
  correctAnswer = b;

  // Display the question in operand-blank format
  questionEl.textContent = `${a} × __ = ${result}`;

  // Build all possible operands 1–9
  const choices = [];
  for (let i = 1; i <= 9; i++) {
    choices.push(i);
  }
  

  // Render option buttons
  choices.forEach(value => {
    const btn = document.createElement('a');
    btn.className = 'topic-card';
    btn.textContent = value;
    btn.href = '#';
    btn.addEventListener('click', e => {
      e.preventDefault();
      handleAnswer(btn, value);
    });
    optionsEl.appendChild(btn);
  });
}

/**
 * Handle user answer: highlight correct and wrong, adjust lives & score, then next question.
 */
function handleAnswer(button, value) {
  // Disable all options and highlight correct
  document.querySelectorAll('#options .topic-card').forEach(el => {
    el.classList.add('disabled');
    if (+el.textContent === correctAnswer) el.classList.add('correct');
  });

  if (value === correctAnswer) {
    // Correct: update score
    score++;
    if (scoreEl) scoreEl.textContent = `Score: ${score}`;
  } else {
    // Wrong: mark it and lose a life
    button.classList.add('wrong');
    lives--;
    updateLivesDisplay();
    if (lives < 1) {
      return setTimeout(gameOver, 800);
    }
  }

  // Load next question
  setTimeout(loadQuestion, 1000);
}

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', () => {
  updateLivesDisplay();
  if (scoreEl) scoreEl.textContent = `Score: ${score}`;
  loadQuestion();
});
