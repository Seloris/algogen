import { Dot } from './genetics/dot';
export function getRandomCoords(width: number, height: number)
    : { x: number, y: number } {
    return {
        x: Math.random() * width,
        y: Math.random() * height
    };
}

export function distanceBetweenPoints(dot1: Dot, dot2: Dot): number {
    return Math.sqrt(Math.pow(dot2.x - dot1.x, 2) + Math.pow(dot2.y - dot1.y, 2));
}