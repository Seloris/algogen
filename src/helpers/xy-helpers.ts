import { Dot } from "../genetics/dots/dots-dna";

export function getRandomCoords(width: number, height: number)
    : { x: number, y: number } {
    return {
        x: Math.random() * width,
        y: Math.random() * height
    };
}


export function distanceBetweenPoints(x1, y1, x2, y2): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function getNewPositionWithinBounds(dot: Dot): { x: number, y: number } {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let variation = 20;
    let x = dot.x + Math.random() * variation - variation / 2;
    let y = dot.y + Math.random() * variation - variation / 2;
    if (x < 0) {
        x = 0
    }
    else if (x >= width) {
        x = width;
    }

    if (y < 0) {
        y = 0;
    }


    else if (y >= height) {
        y = height;
    }

    return { x: x, y: y };
}