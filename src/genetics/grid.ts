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
    public abstract clone(): BaseDna;
    protected abstract evaluate_imp(): number;
    protected abstract mutation_imp();
    protected abstract crossOver_imp(parentB: BaseDna): BaseDna[];
}

export class SquareColor {
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

    clone() {
        let grid = new Grid(this.cloneSquares(), this.mutationRate);
        grid.fitness = this.fitness;
        return grid;
    }

    cloneSquares(): Square[] {
        return this.squares.map(square => {
            return new Square(square.x, square.y, square.size, {
                blue: square.color.blue,
                green: square.color.green,
                red: square.color.red
            });
        });
    }

    protected crossOver_imp(parentB: Grid): Grid[] {
        var mid = Math.floor(Math.random() * this.squares.length);
        let childA = new Grid(this.cloneSquares().slice(0, mid).concat(parentB.cloneSquares().slice(mid)), this.mutationRate);
        let childB = new Grid(parentB.cloneSquares().slice(0, mid).concat(this.cloneSquares().slice(mid)), this.mutationRate);

        childA.mutate();
        childB.mutate();
        return [childA, childB];
    }

    protected evaluate_imp(): number {
        let cumulatedColors = 0;
        this.squares.forEach(square => {
            cumulatedColors += square.color.blue + square.color.green + square.color.red;
        });



        return 1 / (1 + cumulatedColors);
    }

    protected mutation_imp() {
        this.squares.forEach(square => {
            if (Math.random() <= this.mutationRate) {
                square.color.blue = Math.max(0, Math.min(255, square.color.blue + (Math.round(Math.random() * 64 - 32))));
                square.color.green = Math.max(0, Math.min(255, square.color.green + (Math.round(Math.random() * 64 - 32))));
                square.color.red = Math.max(0, Math.min(255, square.color.red + (Math.round(Math.random() * 64 - 32))));
            }
        });
    }
}