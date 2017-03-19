import { distanceBetweenDots, getNewPositionWithinBounds } from '../../helpers/xy-helpers';
import { assign } from 'lodash';
import { BaseDna } from "../base/base-dna";


export enum DotColor {
    Red,
    Blue,
    Green
}

export class Dot {
    constructor(public x: number, public y: number, public dotSize: number, public color: DotColor) {
    }
}

export class Dots extends BaseDna {
    constructor(public dots: Dot[], private mutationRate: number) {
        super();
    }

    cloneDots(): Dot[] {
        return this.dots.map(dot => new Dot(dot.x, dot.y, dot.dotSize, dot.color));
    }

    clone(): Dots {
        let dots = new Dots(this.cloneDots(), this.mutationRate);
        dots.fitness = this.fitness;
        return dots;
    }

    protected crossOver_imp(parentB: Dots): Dots[] {
        var mid = Math.floor(Math.random() * this.dots.length);
        let childA = new Dots(this.cloneDots().slice(0, mid).concat(parentB.cloneDots().slice(mid)), this.mutationRate);
        let childB = new Dots(parentB.cloneDots().slice(0, mid).concat(this.cloneDots().slice(mid)), this.mutationRate);

        childA.mutate();
        childB.mutate();
        return [childA, childB];
    }

    protected evaluate_imp(): number {
        let distanceFromLine = 0;
        this.dots.forEach(dot => {
            let lineY = 300 + dot.color * 100;
            distanceFromLine += Math.abs(lineY - dot.y);
        });
        return 1 / distanceFromLine;
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