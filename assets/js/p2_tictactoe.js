// assets/js/p2_tictactoe.js

const boardEl = document.getElementById('tic-tac-toe');
const msgEl   = document.getElementById('message');
const resetBtn = document.getElementById('reset');

let board, gameOverFlag;

// Winning combinations
const wins = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Initialize or reset the game state
function initGame() {
  board = Array(9).fill(null);
  gameOverFlag = false;
  msgEl.textContent = '';
  renderBoard();
}

// Render the board cells
function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((cell, idx) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.dataset.index = idx;
    div.textContent = cell || '';
    if (!gameOverFlag && !cell) {
      div.addEventListener('click', onPlayerMove);
    } else {
      div.classList.add('disabled');
    }
    boardEl.appendChild(div);
  });
}

// Check for a winner or draw
function checkWinner(mark) {
  return wins.some(combo => combo.every(i => board[i] === mark));
}

// Check if board full
function isDraw() {
  return board.every(cell => cell !== null);
}

// Handle player's move
function onPlayerMove(e) {
  const idx = parseInt(e.currentTarget.dataset.index, 10);
  if (board[idx] || gameOverFlag) return;
  board[idx] = 'X';
  renderBoard();
  if (checkWinner('X')) {
    msgEl.textContent = 'You win!';
    gameOverFlag = true;
    return;
  }
  if (isDraw()) {
    msgEl.textContent = 'Draw!';
    gameOverFlag = true;
    return;
  }
  setTimeout(computerMove, 500);
}

// Computer picks a random empty cell
function computerMove() {
  if (gameOverFlag) return;
  const empty = board
    .map((v,i) => v === null ? i : null)
    .filter(i => i !== null);
  const choice = empty[Math.floor(Math.random() * empty.length)];
  board[choice] = 'O';
  renderBoard();
  if (checkWinner('O')) {
    msgEl.textContent = 'Computer wins!';
    gameOverFlag = true;
    return;
  }
  if (isDraw()) {
    msgEl.textContent = 'Draw!';
    gameOverFlag = true;
  }
}

// Event listeners
resetBtn.addEventListener('click', initGame);
document.addEventListener('DOMContentLoaded', initGame);
