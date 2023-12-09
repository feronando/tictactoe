let boardSize;
let gameBoard;
let gameMode;
let currPlayer = 'X';

function startGame() {
    boardSize = parseInt(document.getElementById('board-size').value);
    gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
    gameMode = document.querySelector('input[name=gameMode]:checked').value;
    renderBoard();
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = gameBoard[i][j];
            cell.addEventListener('click', () => cellClick(i, j));
            row.appendChild(cell);
        }

        boardElement.appendChild(row);
    }
}

function cellClick(row, col) {
    if (gameBoard[row][col] === 'X' || gameBoard[row][col] === 'O') {
        gameBoard[row][col] = '';
    } else {
        gameBoard[row][col] = currPlayer;
        currPlayer = currPlayer === 'X' ? 'O' : 'X';
    }
    renderBoard();
}