const celebrationEmojis = document.querySelectorAll('.celebration');
const winMessage = document.getElementById('winMessage');

const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const tieSound = new Audio('tie.mp3');
const resetSound = new Audio('reset.mp3');

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let isGameActive = true;
clickSound.play();


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
      celebrationEmojis.forEach(el => el.style.display = 'block');
      winMessage.style.display = 'block';


      isGameActive = false;
      return;
      winSound.play();
pattern.forEach(i => cells[i].classList.add('win'));

    }
  }

  if (!gameBoard.includes('')) {
    status.textContent = "It's a tie!";
    isGameActive = false;
    tieSound.play();

  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWinner();

  if (isGameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  gameBoard.fill('');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  celebrationEmojis.forEach(el => el.style.display = 'none');
  winMessage.style.display = 'none';


  currentPlayer = 'X';
  isGameActive = true;
  status.textContent = "Player X's turn";
  resetSound.play();


}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
