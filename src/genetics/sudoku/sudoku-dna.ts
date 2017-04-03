import { getRandomNumberBetween } from '../../helpers/number-helpers';
import { assign, uniq } from 'lodash';
import { BaseDna } from "../base/base-dna";

export function getCellsUniqLength(cells: SudokuCell[]) {
    return uniq(cells.map(c => c.value)).length;
}

export class SudokuCell {
    value?: number;
    isInitial: boolean;

    constructor(value: number, isInit: boolean) {
        this.value = value;
        this.isInitial = isInit;
    }
}
export class SudokuGrid extends BaseDna {
    constructor(public sudokuCells: SudokuCell[], private mutationRate: number) {
        super();
    }

    clone(): SudokuGrid {
        let grid = new SudokuGrid(this.cloneNumbers(), this.mutationRate);
        grid.fitness = this.fitness;
        return grid;
    }

    cloneNumbers(): SudokuCell[] {
        return [...this.sudokuCells.map(c => { return new SudokuCell(c.value, c.isInitial) })];
    }

    protected crossOver_imp(parentB: SudokuGrid): SudokuGrid[] {
        var mid = Math.floor(Math.random() * this.sudokuCells.length);
        let childA = new SudokuGrid(this.cloneNumbers().slice(0, mid).concat(parentB.cloneNumbers().slice(mid)), this.mutationRate);
        let childB = new SudokuGrid(parentB.cloneNumbers().slice(0, mid).concat(this.cloneNumbers().slice(mid)), this.mutationRate);

        childA.mutate();
        childB.mutate();
        return [childA, childB];
    }

    private getRowFitness() {
        let rowFitness = 0;
        for (let i = 0; i < 9; i++) {
            let row = this.getRow(i);
            rowFitness += getCellsUniqLength(row);
        }
        return rowFitness;
    }

    private getColFitness() {
        let colFitness = 0;
        for (let i = 0; i < 9; i++) {
            let col = this.getColumn(i);
            colFitness += getCellsUniqLength(col);
        }
        return colFitness;
    }

    private getBlockFitness() {
        let blockFitness = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let block = this.getBlock(i, j);
                blockFitness += getCellsUniqLength(block);
            }
        }

        return blockFitness;
    }

    protected evaluate_imp(): number {
        return this.getBlockFitness() + this.getRowFitness() + this.getColFitness();
    }

    protected mutation_imp() {
        this.sudokuCells.forEach((cell, i) => {
            if (!cell.isInitial && Math.random() <= this.mutationRate) {
                this.sudokuCells[i] = new SudokuCell(getRandomNumberBetween(1, 9), false);
            }
        });
    }

    public getRow(row: number): SudokuCell[] {
        let start = row * 9;
        let end = start + 9;
        return this.sudokuCells.slice(start, end);
    }

    public getColumn(col: number): SudokuCell[] {
        let numbers = [];
        //todo
        for (let i = 0; i < 9; i++) {
            numbers.push(this.sudokuCells[i * 9 + col]);
        }

        return numbers;
    }

    public getBlock(x: number, y: number): SudokuCell[] {
        let blocks = [];
        let firstBlockIndex = x * 3 + y * (3 * 9);
        for (let col = 0; col < 3; col++) {
            for (let i = 0; i < 3; i++) {
                blocks.push(this.sudokuCells[firstBlockIndex + (col * 9) + i]);
            }
        }

        return blocks;
    }
}