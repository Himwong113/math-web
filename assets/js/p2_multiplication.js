// assets/js/p2_multiplication.js

const livesEl    = document.getElementById('lives');
const lifeIcons  = () => Array.from(livesEl.querySelectorAll('.life'));
const counterEl  = document.getElementById('counter');
const questionEl = document.getElementById('question');
const optionsEl  = document.getElementById('options');

let correctAnswer;
let questionCount = 0;
let lives        = 3;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function updateLivesDisplay() {
  lifeIcons().forEach((el, idx) => {
    el.classList.toggle('lost', idx >= lives);
  });
}

function gameOver() {
  alert('Game Over! You ran out of lives.');
  window.location.href = '../../index.html';
}

function loadQuestion() {
  // If lives have run out, end the game
  if (lives < 1) return gameOver();

  questionCount++;
  counterEl.textContent = `Question: ${questionCount}`;
  optionsEl.innerHTML   = '';

  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  correctAnswer = a * b;
  questionEl.textContent = `${a} × ${b} = ?`;

  // Build answer choices
  const choices = [correctAnswer];
  while (choices.length < 4) {
    const w     = Math.floor(Math.random() * 9) + 1;
    const wrong = w * (Math.floor(Math.random() * 9) + 1);
    if (!choices.includes(wrong)) choices.push(wrong);
  }
  shuffle(choices);

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

function handleAnswer(button, value) {
  // Disable all options and highlight correct
  document.querySelectorAll('#options .topic-card').forEach(el => {
    el.classList.add('disabled');
    if (+el.textContent === correctAnswer) el.classList.add('correct');
  });

  // If wrong, mark it red and lose a life
  if (value !== correctAnswer) {
    button.classList.add('wrong');
    lives--;
    updateLivesDisplay();
  }

  // If they just used their last life, schedule game over
  if (lives < 1) {
    setTimeout(gameOver, 800);
  } else {
    // Otherwise, load next question
    setTimeout(loadQuestion, 1000);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateLivesDisplay();
  loadQuestion();
});
