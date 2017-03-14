import { Dot, BaseDna } from './dot';
import { assign, concat } from 'lodash';

export abstract class BasePopulation<T extends BaseDna>
{
    generation: number = 0;
    dnas: T[];
    bucket: T[];

    constructor(
        protected size: number,
        protected mutationRate: number,
        protected crossoverRate: number) {
    }

    nextGen() {
        for (var dna of this.dnas) {
            dna.evaluate(this.dnas);
        }

        this.fillBucket();
        this.dnas = [];
        for (var i = 0; i < this.size; i++) {
            let parentA = this.getRandomParentFromBucket();
            let parentB = this.getRandomParentFromBucket();
            let childs = parentA.crossOver(parentB);
            childs.forEach(child => {
                if (Math.random() <= this.mutationRate) {
                    child.mutate();
                }

                this.dnas.push(<T>child);
            });
        }

        this.generation++;
        console.log("generation -> " + this.generation);
    }

    private getRandomParentFromBucket(): T {
        let rand = Math.floor(Math.random() * this.bucket.length);
        return this.bucket[rand];
    }

    private fillBucket() {
        let scoreArray = this.dnas.map(x => x.fitness);
        let total = scoreArray.reduce((prev, current) => current + prev);
        this.bucket = [];
        let normalizeScore = (score: number): number => Math.round(score / total * this.size);
        let currentIndex = 0;
        this.dnas.forEach((dna: T) => {
            let currentScore = normalizeScore(dna.fitness);
            for (let i = 0; i < currentScore; i++) {
                this.bucket.push(dna);
            }
        });
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
