import { Dot } from './dot';
import { assign } from 'lodash';

export abstract class BasePopulation<T>
{
    dnas: T[];

    constructor(
        protected size: number,
        protected mutationRate: number,
        protected crossoverRate: number) {
    }

    nextGen() {

    }

    generateFirstPop() {
        this.dnas = this.firstGeneration_imp();
    }

    /** Abstract methods */
    protected abstract firstGeneration_imp(): T[];
}

export class DotPopulation extends BasePopulation<Dot>{
    private dotSize: 3;

    constructor(
        protected size: number,
        protected mutationRate: number,
        protected crossoverRate: number,
        private width,
        private height) {
        super(size, mutationRate, crossoverRate);
    }

    protected firstGeneration_imp(): Dot[] {
        let dnas: Dot[] = [];
        for (let i = 0; i < this.size; i++) {
            let randX = Math.random() * this.width;
            let randY = Math.random() * this.height;
            dnas.push(new Dot(randX, randY, 5));
        }

        return dnas;
    }
}
