import { BaseDna, Dots } from './dot';
import { assign, concat, sortBy } from 'lodash';
import { getRandomDots } from "../helpers";

export abstract class BasePopulation<T extends BaseDna>
{
    generation: number = 0;
    dnas: T[];
    bucket: T[];

    constructor(
        protected populationSize: number,
        protected mutationRate: number,
        protected crossoverRate: number) {
    }

    getBestPopulation(): { generation: number, population: T } {
        let pop = sortBy(this.dnas, (dna) => dna.fitness)[this.dnas.length - 1];
        return {
            generation: this.generation,
            population: pop
        }
    }

    nextGen() {
        for (var dna of this.dnas) {
            dna.evaluate();
        }

        this.fillBucket();
        this.dnas = [];
        for (var i = 0; i < this.populationSize; i++) {
            let parentA = this.getRandomParentFromBucket();
            let parentB = this.getRandomParentFromBucket();
            let childs = parentA.crossOver(parentB);
            childs.forEach(child => {
                child.mutate();
                this.dnas.push(<T>child);
            });
        }

        for (var dna of this.dnas) {
            dna.evaluate();
        }

        this.generation++;
    }

    private getRandomParentFromBucket(): T {
        let rand = Math.floor(Math.random() * this.bucket.length);
        return this.bucket[rand];
    }

    private fillBucket() {
        this.bucket = sortBy(this.dnas, (dna) => dna.fitness)
            .slice(this.populationSize / 2, this.populationSize);
        // let scoreArray = this.dnas.map(x => x.fitness);
        // let total = scoreArray.reduce((prev, current) => current + prev);
        // this.bucket = [];
        // let normalizeScore = (score: number): number => Math.round(score / total * this.size);
        // let currentIndex = 0;
        // this.dnas.forEach((dna: T) => {
        //     let currentScore = normalizeScore(dna.fitness);
        //     for (let i = 0; i < currentScore; i++) {
        //         this.bucket.push(dna);
        //     }
        // });
    }

    generateFirstPop() {
        this.dnas = this.firstGeneration_imp();
    }

    /** Abstract methods */
    protected abstract firstGeneration_imp(): T[];
}

export class DotPopulation extends BasePopulation<Dots>{
    private dotSize = 5;
    private amountDots = 100;

    constructor(
        protected size: number,
        protected mutationRate: number,
        protected crossoverRate: number,
        private width,
        private height) {
        super(size, mutationRate, crossoverRate);
    }

    protected firstGeneration_imp(): Dots[] {
        let dnas: Dots[] = [];
        for (let i = 0; i < this.size; i++) {
            dnas.push(getRandomDots(this.width, this.height, this.dotSize, this.amountDots, this.mutationRate));
        }

        return dnas;
    }
}
