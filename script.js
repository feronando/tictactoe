let boardSize;
let gameBoard;
let gameMode;
let gameStatus = '';
let message = '';
let currPlayer = 'X';

function startGame() {
    currPlayer = 'X';
    boardSize = parseInt(document.getElementById('board-size').value);
    gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
    gameMode = document.querySelector('input[name=gameMode]:checked').value;
    // If the game status is different of empty string, that means that
    // the button was pressed to restart the game
    // thus, it's needed to remove the last message of the game.
    if(gameStatus != ''){
        let gameContainer = document.getElementById('game-container');
        const message = document.getElementById('message-game');
        if(gameContainer.contains(message)){
            gameContainer.removeChild(message);
        }
    }
    gameStatus = '';
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
    // Similarly, adding the end game message.
    if(gameStatus != ''){
        gameContainer = document.getElementById('game-container');
        const message = document.createElement('p');
        message.id = 'message-game';
        message.innerText = gameStatus;
        gameContainer.appendChild(message);
    }
}

function cellClick(row, col) {
    if(gameStatus != '') return;
    if (gameBoard[row][col] === 'X' || gameBoard[row][col] === 'O') {
        gameBoard[row][col] = '';
    } else {
        gameBoard[row][col] = currPlayer;
        currPlayer = currPlayer === 'X' ? 'O' : 'X';
    }
    gameStatus = verifyEndGame(row,col);
    // If the game has not ended, the computer will make the move.
    // Note that it's needed that the game mode is set to single.
    if(gameStatus == '' && gameMode == "single"){
        computerLogic();
    }
    renderBoard();
}

// Function to select a random valid space for the computer set a
// its move.
function computerLogic(){
    while(true){
        let row = Math.floor(Math.random() * boardSize);
        let col = Math.floor(Math.random() * boardSize);
        if(gameBoard[row][col] == ''){
            gameBoard[row][col] = currPlayer;
            currPlayer = currPlayer === 'X' ? 'O' : 'X';
            gameStatus = verifyEndGame(row,col);
            break;
        }
    }
}

function verifyEndGame(row, col){
    return (checkVictory(row, col) == 'Venceu') ? 'Venceu' : checkTie();
}

function checkVictory(row, col){
    let message = '';
    // Verify main diagonal
    if(row == col) message = verifyMainDiagonal();
    // Verify secondary diagonal
    if(row == boardSize - 1 - col){ 
        if(message != 'Venceu') message = verifySecondaryDiagonal();
    }
    // Verify for both rows and columns
    if(message != 'Venceu'){
        message = verifyRowAndCol(row, col);
    }
    return message;
}

function checkTie(){
    for(let row = 0; row < boardSize; ++row){
        for(let col = 0; col < boardSize; ++col){
            if(gameBoard[row][col] == ''){
                return '';
            }
        }
    }
    return 'Deu velha';
}

function verifyMainDiagonal(){
    let count = 0;
    for(let i = 1; i < boardSize; ++i){
        if(gameBoard[i-1][i-1] == gameBoard[i][i]) ++count;
    }
    return count == boardSize-1 ? 'Venceu' : '';
}

function verifySecondaryDiagonal(){
    let count = 0;
    for(let i = 0; i < boardSize; ++i){
        if(gameBoard[i][boardSize - 1 - i] == gameBoard[0][boardSize - 1]) ++count;
    }
    return count == boardSize ? 'Venceu' : '';
}

function verifyRowAndCol(row, col){
    let countRow = countCol = 0;
    for(let i = 1; i < boardSize; ++i){
        if(gameBoard[row][0] == gameBoard[row][i]) ++countRow;
        if(gameBoard[0][col] == gameBoard[i][col]) ++countCol;
    }
    return (countRow == boardSize - 1) || (countCol == boardSize - 1) ? 'Venceu' : '';
}