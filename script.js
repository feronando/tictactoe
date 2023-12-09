let boardSize;
let gameBoard;
let currPlayer = 'X';

function startGame() {
    boardSize = parseInt(document.getElementById('board-size').value);
    gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
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
    console.log(checkVictory(row,col));
    renderBoard();
}

function checkVictory(row, col){
    // Verify main diagonal
    if(row == col) return verifyMainDiagonal();
    // Verify secondary diagonal
    else if(row == boardSize - 1 - col) return verifySecondaryDiagonal();
    // Verify for both rows and columns
    return verifyRowAndCow(row, col);
}

function verifyMainDiagonal(){
    let count = 0;
    for(let i = 1; i < boardSize; ++i){
        if(gameBoard[i-1][i-1] == gameBoard[i][i]) ++count;
    }
    return count == boardSize-1 ? 'Venceu' : 'Ainda não venceu';
}

function verifySecondaryDiagonal(){
    let count = 0;
    for(let i = 0; i < boardSize; ++i){
        if(gameBoard[i][boardSize - 1 - i] == gameBoard[0][boardSize - 1]) ++count;
    }
    return count == boardSize ? 'Venceu' : 'Ainda não venceu';
}

function verifyRowAndCow(row, col){
    let countRow = countCol = 0;
    for(let i = 1; i < boardSize; ++i){
        if(gameBoard[row][i-1] == gameBoard[row][i]) ++countRow;
        if(gameBoard[i-1][col] == gameBoard[i][col]) ++countCol;
    }
    return (countRow == boardSize - 1) || (countCol == boardSize - 1) ? 'Venceu' : 'Ainda não venceu';
}