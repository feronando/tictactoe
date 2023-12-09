let boardSize;

function startGame() {
    boardSize = parseInt(document.getElementById('board-size').value);
    console.log('Board size: ', boardSize);
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
            row.appendChild(cell);
        }

        boardElement.appendChild(row);
    }
}