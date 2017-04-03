import { getCellsUniqLength, SudokuCell, SudokuGrid } from './genetics/sudoku/sudoku-dna';
import { SudokuGame } from './sudoku-game';


import { uniq } from 'lodash';
import { GridGame } from "./grid-game";
import { DotsGame } from "./dots-game";

const POP_SIZE = 2000;
const MUTATION_RATE = 0.01;
const CROSSOVER_RATE = 1;
const KEEP_ELIT_DNA = 0;

// Grid
const GRID_SQUARE_SIZE = 80;

// Dots
const AMOUNT_DOTS = 100;


// Sudko

// let gridGame = new GridGame();
// gridGame.init(POP_SIZE, MUTATION_RATE, CROSSOVER_RATE, KEEP_ELIT_DNA, GRID_SQUARE_SIZE);

// let dotsGame = new DotsGame();
// dotsGame.init(POP_SIZE, MUTATION_RATE, CROSSOVER_RATE, KEEP_ELIT_DNA, AMOUNT_DOTS);


generateSudokuContainer();

let sudokuGame = new SudokuGame();
sudokuGame.newPopulation$.subscribe((sudokuGrid: SudokuGrid) => {
    renderSudokuGrid(sudokuGrid);
});


let initials: { i: number, val: number }[] =
    [
        { i: 0, val: 5 },
        { i: 1, val: 3 },
        { i: 4, val: 7 },
        { i: 9, val: 6 },
        { i: 12, val: 1 },
        { i: 13, val: 9 },
        { i: 14, val: 5 },
        { i: 19, val: 9 },
        { i: 20, val: 8 },
        { i: 25, val: 6 },
        { i: 27, val: 8 },
        { i: 31, val: 6 },
        { i: 35, val: 3 },
        { i: 36, val: 4 },
        { i: 39, val: 8 },
        { i: 41, val: 3 },
        { i: 44, val: 1 },
        { i: 45, val: 7 },
        { i: 49, val: 2 },
        { i: 53, val: 6 },
        { i: 55, val: 6 },
        { i: 60, val: 2 },
        { i: 61, val: 8 },
        { i: 66, val: 4 },
        { i: 67, val: 1 },
        { i: 68, val: 9 },
        { i: 71, val: 5 },
        { i: 76, val: 8 },
        { i: 79, val: 7 },
        { i: 80, val: 9 },

    ];

let cells = [];
for (let i = 0; i < 9 * 9; i++) {
    let cellValue = null;
    for (let x = 0; x < initials.length; x++) {
        if (initials[x].i == i) {
            cellValue = initials[x].val;
        }
    }
    cells.push(new SudokuCell(cellValue, cellValue !== null));
}

sudokuGame.init(POP_SIZE, MUTATION_RATE, CROSSOVER_RATE, KEEP_ELIT_DNA, cells);


function generateSudokuContainer() {
    for (let row = 0; row < 9; row++) {
        let rowDiv = document.createElement('div');
        rowDiv.className = "row";
        for (let col = 0; col < 9; col++) {
            let item = document.createElement('div');
            item.classList.add('block');
            if (row == 0) {
                item.classList.add('col-indicator');
            }

            if (row % 3 == 0 && col % 3 == 0) {
                item.classList.add('block-indicator');
            }

            item.innerText = '' + col;
            rowDiv.appendChild(item);
        }
        document.getElementById('sudoku-grid').appendChild(rowDiv);
    }
}

function renderSudokuGrid(sudokuGrid: SudokuGrid) {
    let rowDivs = document.getElementsByClassName('row');
    let cursor = 0;
    for (let i = 0; i < rowDivs.length; i++) {
        // is Row OK
        let isRowOk = getCellsUniqLength(sudokuGrid.getRow(i)) == 9;
        if (isRowOk && !rowDivs[i].classList.contains('ok')) {
            rowDivs[i].classList.add('ok');
        }
        else if (!isRowOk && rowDivs[i].classList.contains('ok')) {
            rowDivs[i].classList.remove('ok');
        }

        // Fill values
        for (let j = 0; j < rowDivs[i].children.length; j++) {
            let element = rowDivs[i].children[j];
            // Is Col OK
            if (i == 0) {
                let isColOK = getCellsUniqLength(sudokuGrid.getColumn(j)) == 9;
                if (isColOK && !element.classList.contains('ok')) {
                    element.classList.add('ok');
                }
                else if (!isColOK && element.classList.contains('ok')) {
                    element.classList.remove('ok');
                }
            }

            // Is Block OK

            if (i % 3 == 0 && j % 3 == 0) {
                let isBlockOK = getCellsUniqLength(sudokuGrid.getBlock(i / 3, j / 3)) == 9;
                if (isBlockOK && !element.classList.contains('block-ok')) {
                    element.classList.add('block-ok');
                }
                else if (!isBlockOK && element.classList.contains('block-ok')) {
                    element.classList.remove('block-ok');
                }
            }

            element.innerHTML = '' + sudokuGrid.sudokuCells[cursor++].value;
        }
    }
}