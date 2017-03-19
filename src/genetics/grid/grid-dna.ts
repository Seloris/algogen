import { assign } from 'lodash';
import { BaseDna } from "../base/base-dna";

export class RgbColor {
    red: number;
    green: number;
    blue: number;
}

export class Square {
    constructor(public x: number, public y: number, public size: number, public color: RgbColor) {
    }
}

export class Grid extends BaseDna {
    constructor(public squares: Square[], private mutationRate: number) {
        super();
    }

    clone(): Grid {
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


        return cumulatedColors != 0 ? 1 / cumulatedColors : 0;
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