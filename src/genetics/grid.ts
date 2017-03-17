import { getRandomColor } from '../helpers';
import { assign } from 'lodash';

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

export interface SquareColor {
    red: number;
    green: number;
    blue: number;
}

export class Square {
    constructor(public x: number, public y: number, public size: number, public color: SquareColor) {
    }
}

export class Grid extends BaseDna {
    constructor(public squares: Square[], private mutationRate: number) {
        super();
    }

    cloneSquares(): Square[] {
        return this.squares.map(square => {
            return new Square(square.x, square.y, square.size, square.color);
        });
    }

    protected crossOver_imp(parentB: Grid): Grid[] {
        var mid = Math.floor(Math.random() * this.squares.length);
        let childA = new Grid(this.cloneSquares().slice(0, mid).concat(parentB.cloneSquares().slice(mid)), this.mutationRate);
        let childB = new Grid(parentB.cloneSquares().slice(0, mid).concat(this.cloneSquares().slice(mid)), this.mutationRate);
        return [childA, childB];
    }

    protected evaluate_imp(): number {
        let cumulatedColors = 0;
        this.squares.forEach(square => {
            cumulatedColors += Math.pow(square.color.blue + square.color.green + square.color.red, 2);
        });

        return cumulatedColors;
    }

    protected mutation_imp() {
        this.squares.forEach(square => {
            if (Math.random() <= this.mutationRate) {
                square.color.blue = Math.max(0, Math.min(255, square.color.blue + (Math.round(Math.random() * 2 - 1))));
                square.color.green = Math.max(0, Math.min(255, square.color.green + (Math.round(Math.random() * 2 - 1))));
                square.color.red = Math.max(0, Math.min(255, square.color.red + (Math.round(Math.random() * 2 - 1))));
            }
        });
    }
}