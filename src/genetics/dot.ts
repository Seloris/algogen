import { assign } from 'lodash';
import { distanceBetweenPoints } from "../helpers";

export abstract class BaseDna {
    fitness: number;

    public crossOver(parentB: BaseDna): BaseDna[] {
        return this.crossOver_imp(parentB);
    }

    public mutate() {
        this.mutation_imp();
    }

    public evaluate(pop: BaseDna[]) {
        this.fitness = this.evaluate_imp(pop);
    }

    /** Abstract Methods*/
    protected abstract evaluate_imp(pop: BaseDna[]): number;
    protected abstract mutation_imp();
    protected abstract crossOver_imp(parentB: BaseDna): BaseDna[];
}

export class Dot extends BaseDna {
    constructor(public x: number, public y: number, public size: number) {
        super();
    }

    protected crossOver_imp(parentB: Dot): Dot[] {
        let crossOverPoint = Math.random();

        var interval_X = (this.x - parentB.x) * crossOverPoint;
        var interval_Y = (this.y - parentB.y) * crossOverPoint;

        return [new Dot(this.x - interval_X, this.y - interval_X, this.size)];
    }

    protected evaluate_imp(pop: Dot[]) {
        let fitness = 0;
        pop.forEach(dna => {
            let distance = distanceBetweenPoints(this, dna);
            if (distance <= 20) {
                // Too close motherfucker
            }
            else if (distance <= 50) {
                fitness += 100;
            }
            else if (distance <= 100) {
                fitness += 300;
            }
            if (distance <= 200) {
                fitness += 100;
            }
        });
        return fitness;
    }

    protected mutation_imp() {
        this.x += (Math.random() * 300) - 600;
        this.y += (Math.random() * 300) - 600;
    }
}