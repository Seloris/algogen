import { Dot } from './dot';

export abstract class BasePopulation<T>
{
    population: T[];

    constructor(
        protected size: number,
        protected mutationRate: number,
        protected crossoverRate: number) {
    }

    protected abstract firstGeneration_imp();
    generateFirstPop() {
        this.population = this.firstGeneration_imp();
    }

    nextGen(): T[] {
        return this.population;
    }
}

export class DotPopulation extends BasePopulation<Dot>{
    protected firstGeneration_imp() {
        for (let i = 0; i < this.size; i++) {
            this.population.push(new Dot());
        }
    }
}
