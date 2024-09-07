// script.js

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const singlePlayerButton = document.getElementById('singlePlayerButton');
const multiPlayerButton = document.getElementById('multiPlayerButton');
const exitButton = document.getElementById('exitButton');
const winnerModal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');
const closeModal = document.querySelector('.close');
const playAgainButton = document.getElementById('playAgainButton');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let isSinglePlayer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cellIndex = event.target.getAttribute('data-index');

    if (board[cellIndex] !== "" || !gameActive) {
        return;
    }

    updateBoard(cellIndex);
    checkWinner();

    if (isSinglePlayer && gameActive) {
        setTimeout(systemMove, 500);
    }
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    cells[index].style.pointerEvents = "none";
};

const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showWinnerModal(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        showWinnerModal(`It's a Tie!`);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateHoverTurn();
    statusText.innerText = `Player ${currentPlayer}'s turn`;
};

const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.pointerEvents = "auto";
    });

    updateHoverTurn();
};

const systemMove = () => {
    let availableCells = [];
    board.forEach((value, index) => {
        if (value === "") availableCells.push(index);
    });

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    updateBoard(randomIndex);
    checkWinner();
};

const startSinglePlayer = () => {
    resetGame();
    isSinglePlayer = true;
    statusText.innerText = `Player ${currentPlayer}'s turn (Single Player)`;
};

const startMultiPlayer = () => {
    resetGame();
    isSinglePlayer = false;
    statusText.innerText = `Player ${currentPlayer}'s turn (Multiplayer)`;
};

const exitGame = () => {
    window.close();
};

const showWinnerModal = (message) => {
    winnerText.innerText = message;
    winnerModal.style.display = "block";
};

const closeModalHandler = () => {
    winnerModal.style.display = "none";
};

singlePlayerButton.addEventListener('click', startSinglePlayer);
multiPlayerButton.addEventListener('click', startMultiPlayer);
exitButton.addEventListener('click', exitGame);
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
closeModal.addEventListener('click', closeModalHandler);
playAgainButton.addEventListener('click', () => {
    resetGame();
    closeModalHandler();
});

const updateHoverTurn = () => {
    cells.forEach(cell => cell.setAttribute('data-turn', currentPlayer));
};

updateHoverTurn();
