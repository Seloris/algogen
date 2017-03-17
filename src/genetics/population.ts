import { BaseDna, Grid } from './grid';
import { assign, concat, sortBy } from 'lodash';
import { getRandomSquares } from "../helpers";

export abstract class BasePopulation<T extends BaseDna>
{
    generation: number = 0;
    dnas: T[];

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

    generate() {
        let bucket = this.dnas.map(dna => {
            return <T>dna.clone();
        });

        bucket.sort((a: T, b: T) => a.fitness - b.fitness);
        let offsprings: T[] = [];
        for (let i = 0; i < this.populationSize; i++) {
            let parents = this.selectParents([].concat(bucket));
            // add crossover probability
            let childs = parents[0].crossOver(parents[1]);
            offsprings.push(<T>childs[0]);
        }

        // Take one elit parent
        let elitism = 1;
        for (let i = 0; i < elitism; i++) {
            offsprings.push(bucket[i]);
        }

        offsprings.sort((a: T, b: T) => a.fitness - b.fitness);
        this.dnas = offsprings;
    }

    nextGen() {
        this.generate();

        for (var dna of this.dnas) {
            dna.evaluate();
        }

        this.generation++;
    }

    selectParents(pool: T[]): T[] {
        return this.rouletteSelection(pool);
    }

    rouletteSelection(pool: T[]): T[] {
        let mother: T = null;
        let father: T = null;
        var fitnessSum = 0;

        pool.forEach(adn => {
            fitnessSum += adn.fitness;
        });

        let i = 0;
        let choose = Math.floor(Math.random() * fitnessSum);
        pool.forEach(adn => {
            if (choose <= adn.fitness) {
                mother = adn;
                return;
            }
            choose -= adn.fitness;
            i++;
        });

        fitnessSum -= mother.fitness;

        pool.splice(i, 1);
        let test = 0;
        i = 0;
        choose = Math.floor(Math.random() * fitnessSum);
        pool.forEach(adn => {
            if (choose <= adn.fitness) {
                father = adn;
                return;
            }
            choose -= adn.fitness;
            i++;
        });

        return [mother, father];
    }

    generateFirstPop() {
        this.dnas = this.firstGeneration_imp();

        for (var dna of this.dnas) {
            dna.evaluate();
        }
    }

    /** Abstract methods */
    protected abstract firstGeneration_imp(): T[];
}

export class DotPopulation extends BasePopulation<Grid>{
    constructor(
        protected populationSize: number,
        protected mutationRate: number,
        protected crossoverRate: number,
        private width,
        private height,
        private squareSize) {
        super(populationSize, mutationRate, crossoverRate, );
    }

    protected firstGeneration_imp(): Grid[] {
        let dnas: Grid[] = [];
        for (let i = 0; i < this.populationSize; i++) {
            let squares = getRandomSquares(this.width, this.height, this.squareSize);
            dnas.push(new Grid(squares, this.mutationRate));
        }

        return dnas;
    }
}
