function plantMines(cols, rows, mines, boardArr) {
    let plantedMines = 0, x, y;

    while (plantedMines < mines)
    {
        x =  Math.floor(Math.random() * cols);
        y =  Math.floor(Math.random() * rows);

        if (boardArr[x][y].dataset.state !== "mine")
        {
            boardArr[x][y].setAttribute("data-state", 'mine');
            boardArr[x][y].classList.toggle('mine');
            console.log(x, y);
            plantedMines++;
        }
    }
    calculateDistance(cols, rows, boardArr);
}
function calculateDistance(cols, rows, boardArr) {
    var i, j;

    for (i = 0; i < cols; i++)
        for (j = 0; j < rows; j++) {
            if (boardArr[i][j].dataset.state !== "mine") {
                let minesNear = getBombsNear(i, j, boardArr, cols, rows);
                if (minesNear === 0) {
                    boardArr[i][j].setAttribute("data-state", 'empty');
                    boardArr[i][j].classList.toggle('empty');
                }
                else {
                    boardArr[i][j].innerHTML = "<p class='bombsNear'>" + minesNear + "</p>";
                }
            }
        }
}
function getBombsNear(x, y, boardArr, cols, rows) {
    let mines = 0;
    if (check(x, y-1, boardArr, cols, rows) === true) {
        mines++;
    }
    if (check(x + 1, y - 1, boardArr, cols, rows) === true) {
        mines++;
    }
    if (check(x + 1, y, boardArr, cols, rows) === true) {
        mines++;
    }
    if (check(x + 1, y + 1, boardArr, cols, rows) === true) {
        mines++;
    }
    if (check(x, y + 1, boardArr, cols, rows) === true) {
        mines++;
    }
    if (check(x - 1, y + 1, boardArr, cols, rows) === true) {
        mines++;
    }
    if (check(x - 1, y, boardArr, cols, rows) === true) {
        mines++;
    }
    if (check(x - 1, y - 1, boardArr, cols, rows) === true) {
        mines++;
    }
    return mines;
}
function check(x, y, boardArr, cols, rows) {
    if (x >=0 && x < cols &&
        y >=0 && y < rows &&
        boardArr[x][y].dataset.state === "mine")

        return true;
}



