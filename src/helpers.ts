import { Dot, DotColor, Dots } from './genetics/dot';

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

export function getRandomDots(width: number, height: number, dotSize: number, amountDots: number, mutationRate: number): Dots {

    let dotArray = [];
    for (let i = 0; i < amountDots; i++) {
        let randX = Math.random() * width;
        let randY = Math.random() * height;
        dotArray.push(new Dot(randX, randY, dotSize, getRandomColor()));
    }

    let dots = new Dots(dotArray, mutationRate);
    return dots;
}

function getRandomColor(): DotColor {
    return Math.floor(<DotColor>Math.random() * 3);
}

export function colorToFilename(dotColor: DotColor) {
    switch (dotColor) {
        case DotColor.Blue:
            return "blue-dot.png";
        case DotColor.Green:
            return "green-dot.png";
        case DotColor.Red:
            return "red-dot.png"
    }
}

export function getNewPositionWithinBounds(dot: Dot): { x: number, y: number } {
    let width = 800;
    let height = 800;

    let x = dot.x + Math.random() * 100;// - 50;
    let y = dot.y;// + Math.random() * 100 - 50;
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