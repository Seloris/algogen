import { Dot } from "../genetics/dots/dots-dna";

export function getRandomCoords(width: number, height: number)
    : { x: number, y: number } {
    return {
        x: Math.random() * width,
        y: Math.random() * height
    };
}


export function distanceBetweenDots(dot1: Dot, dot2: Dot): number {
    return Math.sqrt(Math.pow(dot2.x - dot1.x, 2) + Math.pow(dot2.y - dot1.y, 2));
}

export function getNewPositionWithinBounds(dot: Dot): { x: number, y: number } {
    let width = 800;
    let height = 800;
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