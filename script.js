// 🎉 Select the celebration emojis
const celebrationEmojis = document.querySelectorAll('.celebration');

// 🏁 Select the win message
const winMessage = document.getElementById('winMessage');

// 🔊 Load sound effects
const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const tieSound = new Audio('tie.mp3');
const resetSound = new Audio('reset.mp3');

// 📦 Game elements
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');

// 🎮 Game state
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let isGameActive = true;

// ✅ Check for a winner
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      pattern.forEach(i => cells[i].classList.add('win'));

      status.textContent = `Player ${gameBoard[a]} wins!`;
      winSound.play();

      // 🎉 Show emojis and win message
      celebrationEmojis.forEach(el => el.style.display = 'block');
      winMessage.style.display = 'block';

      isGameActive = false;
      return;
    }
  }

  // 🤝 Tie check
  if (!gameBoard.includes('')) {
    status.textContent = "It's a tie!";
    tieSound.play();
    isGameActive = false;
  }
}

// 🖱️ Handle cell clicks
function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  clickSound.play();
  checkWinner();

  if (isGameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// 🔄 Reset the game
function resetGame() {
  gameBoard.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });

  // 🎉 Hide emojis and win message
  celebrationEmojis.forEach(el => el.style.display = 'none');
  winMessage.style.display = 'none';

  currentPlayer = 'X';
  isGameActive = true;
  status.textContent = "Player X's turn";
  resetSound.play();
}

// 🧠 Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

