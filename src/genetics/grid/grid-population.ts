import { assign, sortBy } from 'lodash';
import { Grid, Square } from './grid-dna';
import { BasePopulation } from "../base/base-population";
import { getRandomRgbColor } from "../../helpers/color-helpers";

export class GridPopulation extends BasePopulation<Grid>{
    constructor(
        protected populationSize: number,
        protected mutationRate: number,
        protected crossoverRate: number,
        protected keepElitDna: number,
        private width: number,
        private height: number,
        private squareSize) {
        super(populationSize, mutationRate, crossoverRate, keepElitDna);
    }

    protected firstGeneration_imp(): Grid[] {
        let dnas: Grid[] = [];
        for (let i = 0; i < this.populationSize; i++) {
            // create a random Grid
            let squares: Square[] = [];
            let widthAmount = this.width / this.squareSize;
            let heightAmount = this.height / this.squareSize;
            for (let x = 0; x < widthAmount; x++) {
                for (let y = 0; y < heightAmount; y++) {
                    squares.push(new Square(x * this.squareSize, y * this.squareSize, this.squareSize, getRandomRgbColor()));
                }
            }
            dnas.push(new Grid(squares, this.mutationRate));
        }

        return dnas;
    }
}
