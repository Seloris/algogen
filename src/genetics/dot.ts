import { assign } from 'lodash';
import { distanceBetweenPoints, getNewPositionWithinBounds } from '../helpers';

export abstract class BaseDna {
    fitness: number = 0;

    public crossOver(parentB: BaseDna): BaseDna[] {
        return this.crossOver_imp(parentB);
    }

    public mutate() {
        this.mutation_imp();
    }

    public evaluate() {
        this.fitness = this.evaluate_imp();
    }

    /** Abstract Methods*/
    protected abstract evaluate_imp(): number;
    protected abstract mutation_imp();
    protected abstract crossOver_imp(parentB: BaseDna): BaseDna[];
}

export enum DotColor {
    Red,
    Blue,
    Green
}

export class Dot {
    constructor(public x: number, public y: number, public size: number, public color: DotColor) {
    }
}

export class Dots extends BaseDna {
    constructor(public dots: Dot[], private mutationRate: number) {
        super();
    }

    protected crossOver_imp(parentB: Dots): Dots[] {
        let crossOverPoint = Math.floor(Math.random() * (parentB.dots.length));
        let dotsA = [...this.dots.slice(0, crossOverPoint), ...parentB.dots.slice(crossOverPoint, parentB.dots.length)];
        let dotsB = [...parentB.dots.slice(0, crossOverPoint), ...this.dots.slice(crossOverPoint, this.dots.length)];
        let childA = new Dots(dotsA, this.mutationRate);
        let childB = new Dots(dotsB, this.mutationRate);
        return [childA, childB];
    }

    protected evaluate_imp(): number {
        let fitness = 0;
        this.dots.forEach(dot => {
            let currentCol = dot.color;
            fitness += dot.x;
            // this.dots.forEach(otherDot => {
            //     if (otherDot == dot) {
            //         return;
            //     }
            //     fitness += this.fitnessBetweenDots(dot, otherDot);

            // });
        });

        return fitness;
    }

    fitnessBetweenDots(dot: Dot, otherDot: Dot): number {
        if (dot.x == otherDot.x && dot.y == otherDot.y) {
            return 0;
        }


        // pack dots with same colors
        if (dot.color == otherDot.color) {
            let distance = distanceBetweenPoints(dot, otherDot);
            if (distance <= 5) {
                return 100;
            }
            else if (distance <= 30) {
                return 50;
            }
            else if (distance <= 100) {
                return 10;
            }
        }

        return 0;
    }

    protected mutation_imp() {
        this.dots.forEach(dot => {
            if (Math.random() <= this.mutationRate) {
                let xy = getNewPositionWithinBounds(dot);
                dot.x = xy.x;
                dot.y = xy.y;
            }
        });
    }
}