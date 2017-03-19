import { sortBy } from 'lodash';
import { BaseDna } from "./base-dna";

export abstract class BasePopulation<T extends BaseDna>
{
    generation: number = 0;
    dnas: T[];

    constructor(
        protected populationSize: number,
        protected mutationRate: number,
        protected crossoverRate: number,
        protected keepElitDna: number) {
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

        // sort for selection
        bucket.sort((a: T, b: T) => a.fitness - b.fitness);
        let offsprings: T[] = [];
        for (let i = 0; i < this.populationSize; i++) {
            let parents = this.selectParents([].concat(bucket));
            // add crossover probability
            let childs = parents[0].crossOver(parents[1]);
            offsprings.push(<T>childs[0]);
        }

        // Take one elit parent
        for (let i = 0; i < this.keepElitDna; i++) {
            offsprings.push(bucket[i]);
        }

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
        return this.rankSelection(pool);
    }

    rankSelection(pool: T[]): T[] {
        let mother: T = null;
        let father: T = null;

        var choose_one = function () {
            var sum_fitness = (pool.length + 1) * (pool.length / 2);
            var choose = Math.floor(Math.random() * sum_fitness);
            for (var i = 0; i < pool.length; i++) {
                if ((i + 1) * (i / 2) >= choose) {
                    return pool.splice(i, 1)[0];
                }
            }

            return pool.pop(); // last element, if for some reason we get here
        };

        return [choose_one(), choose_one()];
    }

    generateFirstPop() {
        this.dnas = this.firstGeneration_imp();
        if (this.dnas.length == 0) {
            throw new Error("Dna list is empty after generateFirstPop !");
        }

        for (var dna of this.dnas) {
            dna.evaluate();
        }
    }

    /** Abstract methods */
    protected abstract firstGeneration_imp(): T[];
}