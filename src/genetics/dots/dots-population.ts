import { getRandomRgbColor, getRandomDotColor } from '../../helpers/color-helpers';
import { assign, sortBy } from 'lodash';
import { BasePopulation } from "../base/base-population";
import { Dot, Dots } from './dots-dna';

export class DotsPopulation extends BasePopulation<Dots>{
    constructor(
        protected populationSize: number,
        protected mutationRate: number,
        protected crossoverRate: number,
        protected keepElitDna: number,
        private width: number,
        private height: number,
        private amountDots: number) {
        super(populationSize, mutationRate, crossoverRate, keepElitDna);
    }

    protected firstGeneration_imp(): Dots[] {
        let dnas: Dots[] = [];
        for (let i = 0; i < this.populationSize; i++) {
            let dotArray = [];
            for (let i = 0; i < this.amountDots; i++) {
                let randX = Math.round(Math.random() * this.width);
                let randY = Math.round(Math.random() * this.height);
                dotArray.push(new Dot(randX, randY, 5, getRandomDotColor()))
            }

            dnas.push(new Dots(dotArray, this.mutationRate));
        }

        return dnas;
    }
}
