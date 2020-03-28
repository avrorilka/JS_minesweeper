let defaultRows = 8;
let defaultCols = 8;
let defaultMines = 8;
defaultCreator();
let rowsElem = document.querySelector('#rows');
let colsElem = document.querySelector('#cols');
let minesElem = document.querySelector('#mines');

function defaultCreator() {
    document.body.innerHTML = "<h1>Minesweeper</h1>";

    let gameInfoBox = document.createElement('div');
    gameInfoBox.id = 'gameInfoBox';
    gameInfoBox.innerHTML = "<p class='flagsText'>" + defaultMines + " Flags left!</p>";
    document.body.appendChild(gameInfoBox);

    drawTable(defaultCols, defaultRows, defaultMines);
    drawOptions();
}

function drawOptions() {
    let optionDivElem = document.createElement('div');
    optionDivElem.id = 'options';
    let form = document.createElement('form');

    let l = document.createElement('label');
    l.innerHTML="Cols: ";
    optionDivElem.appendChild(l);

    l = document.createElement('input');
    l.setAttribute('type',"number");
    l.id = 'cols';
    l.setAttribute('value',+8);
    l.setAttribute('max',+50);
    l.setAttribute('min',+3);
    optionDivElem.appendChild(l);

    l = document.createElement('label');
    l.innerHTML="Rows: ";
    optionDivElem.appendChild(l);

    l = document.createElement('input');
    l.setAttribute('type',"number");
    l.setAttribute('value',+8);
    l.id = 'rows';
    l.setAttribute('max',+50);
    l.setAttribute('min',+3);
    optionDivElem.appendChild(l);

    l = document.createElement('label');
    l.innerHTML="Mines: ";
    optionDivElem.appendChild(l);

    l = document.createElement('input');
    l.setAttribute('type',"number");
    l.id = "mines";
    l.setAttribute('value',+8);
    l.setAttribute('max',+2500);
    l.setAttribute('min',+1);
    optionDivElem.appendChild(l);

    l = document.createElement('p');
    l.className = "settings";
    l.innerHTML="Settings:";
    optionDivElem.appendChild(l);

    l = document.createElement('button');
    l.id = "submit";
    l.innerHTML="Submit";
    optionDivElem.appendChild(l);

    optionDivElem.appendChild(form);
    document.body.appendChild(optionDivElem);

}
function drawTable(cols, rows, mines) {

    let boardArr = new Array(cols);

    let wholeTable = document.createElement('div');
    wholeTable.className = 'table';
    wholeTable.id = 'generatedBlock';

    for (var i = 0; i < cols; i++)  {
        let rowElem = document.createElement('div');
        rowElem.className = 'row';
        boardArr[i] = new Array(rows);

        for (var j = 0; j < rows; j++) {

            boardArr[i][j] = document.createElement('div');
            boardArr[i][j].className = ("cell");
            boardArr[i][j].classList.toggle('hide');
            rowElem.appendChild(boardArr[i][j]);
        }
        wholeTable.appendChild(rowElem);
    }
    document.body.appendChild(wholeTable);

    plantMines(cols, rows, mines, boardArr);
    return wholeTable;
}

let generateButtonElem = document.querySelector('#submit');
let generatedBlockElem = document.querySelector('#generatedBlock');

generateButtonElem.addEventListener("click", function () {
    let rows = +rowsElem.value;
    let cols = +colsElem.value;
    let mines = +minesElem.value;
    if (+(rows * cols) > mines){
        generatedBlockElem.innerHTML = '';
        generatedBlockElem.appendChild(drawTable(rows, cols, mines));
        document.querySelector("#gameInfoBox").innerHTML = "<p class='flagsText'>" + defaultMines + " Flags left!</p>";

    }
    else alert("Error! Wrong number of bombs!")
});
generatedBlockElem.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    let element = event.target;
    let flagCount = 0;

    if (event.target.tagName === 'DIV') {
        element.classList.toggle('flag');
        flagCount = +(document.getElementsByClassName("flag").length);

        if (+flagCount === +(minesElem.value)+1) {
            alert("No flags left");
            element.classList.toggle('flag');
            document.querySelector("#gameInfoBox").innerHTML = "<p class='flagsText'> 0 Flags left!</p>";
        }
        else
            document.querySelector("#gameInfoBox").innerHTML = "<p class='flagsText'>" + ((+minesElem.value)- (+flagCount)) + " Flags left!</p>";
    }
});
generatedBlockElem.addEventListener('click', function showCellInfo(event) {
    let rows = +rowsElem.value;
    let cols = +colsElem.value;
    let mines = +minesElem.value;

    let element = event.target;
    if (event.target.tagName === 'DIV') {
        element.classList.remove("hide");

        if (element.dataset.state === "mine") {
            alert("Game Over!");
           let minesList = document.getElementsByClassName("mine");
            for (var i = 0; i < minesList.length; i++) {
                minesList[i].classList.remove("hide");
            }
        }
        if (element.dataset.state === "empty") {

        }
        event.preventDefault();
    }

});
