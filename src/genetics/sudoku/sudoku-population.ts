import { getRandomNumberBetween } from '../../helpers/number-helpers';
import { assign, sortBy } from 'lodash';
import { BasePopulation } from "../base/base-population";
import { SudokuCell, SudokuGrid } from './sudoku-dna';

export class SudokuPopulation extends BasePopulation<SudokuGrid>{
    constructor(
        protected populationSize: number,
        protected mutationRate: number,
        protected crossoverRate: number,
        protected keepElitDna: number,
        private initialCells: SudokuCell[]) {
        super(populationSize, mutationRate, crossoverRate, keepElitDna);
    }

    protected firstGeneration_imp(): SudokuGrid[] {
        let gridSize = 9;
        let dnas: SudokuGrid[] = [];
        for (let pop = 0; pop < this.populationSize; pop++) {
            let cells: SudokuCell[] = [];
            for (let i = 0; i < gridSize * gridSize; i++) {
                if (this.initialCells[i].isInitial) {
                    cells.push(new SudokuCell(this.initialCells[i].value, true));
                }
                else {
                    cells.push(new SudokuCell(getRandomNumberBetween(1, 9), false));
                }
            }

            dnas.push(new SudokuGrid(cells, this.mutationRate));
        }

        return dnas;
    }
}
