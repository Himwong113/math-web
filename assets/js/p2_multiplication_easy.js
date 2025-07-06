// assets/js/p2_multiplication.js

const livesEl    = document.getElementById('lives');
const lifeIcons  = () => Array.from(livesEl.querySelectorAll('.life'));
const counterEl  = document.getElementById('counter');
const scoreEl    = document.getElementById('score');
const questionEl = document.getElementById('question');
const optionsEl  = document.getElementById('options');

let correctAnswer;
let questionCount = 0;
let lives        = 3;
let score        = 0;
let timerEl, timerInterval, timeLeft;

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
  alert(`Game Over! Your score: ${score}`);
  window.location.href = 'index.html';
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15; // 15 seconds per question
  if (!timerEl) {
    timerEl = document.createElement('div');
    timerEl.id = 'timer';
    timerEl.style.textAlign = 'center';
    timerEl.style.fontSize = '1.2rem';
    counterEl.parentNode.insertBefore(timerEl, counterEl.nextSibling);
  }
  timerEl.textContent = `Time: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // treat as wrong answer
      lives--;
      updateLivesDisplay();
      if (lives < 1) return setTimeout(gameOver, 800);
      setTimeout(loadQuestion, 500);
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timerInterval);
  if (lives < 1) return gameOver();

  questionCount++;
  counterEl.textContent = `Question: ${questionCount}`;
  optionsEl.innerHTML   = '';

  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const result = a * b;
  correctAnswer = b;

  questionEl.textContent = `${a} × __ = ${result}`;

  const choices = [];
  for (let i = 1; i <= 9; i++) choices.push(i);
  shuffle(choices);

  choices.forEach(value => {
    const btn = document.createElement('a');
    btn.className = 'topic-card';
    btn.textContent = value;
    btn.href = '#';
    btn.addEventListener('click', e => {
      e.preventDefault();
      clearInterval(timerInterval);
      handleAnswer(btn, value);
    });
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function handleAnswer(button, value) {
  document.querySelectorAll('#options .topic-card').forEach(el => {
    el.classList.add('disabled');
    if (+el.textContent === correctAnswer) el.classList.add('correct');
  });

  if (value === correctAnswer) {
    score++;
    if (scoreEl) scoreEl.textContent = `Score: ${score}`;
  } else {
    button.classList.add('wrong');
    lives--;
    updateLivesDisplay();
    if (lives < 1) {
      return setTimeout(gameOver, 800);
    }
  }

  setTimeout(loadQuestion, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  updateLivesDisplay();
  if (scoreEl) scoreEl.textContent = `Score: ${score}`;
  loadQuestion();
});
