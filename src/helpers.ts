import { Square, SquareColor, Grid } from './genetics/grid';

export function getRandomCoords(width: number, height: number)
    : { x: number, y: number } {
    return {
        x: Math.random() * width,
        y: Math.random() * height
    };
}

export function getRandomColor(): SquareColor {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return {
        red: r,
        green: g,
        blue: b
    };
}

export function rgbToHex(Color: SquareColor) {
    return PIXI.utils.rgb2hex([Color.red / 255, Color.green / 255, Color.blue / 255]);
}

export function getRandomSquares(width: number, height: number, squareSize: number): Square[] {
    let squares: Square[] = [];
    let widthAmount = width / squareSize;
    let heightAmount = height / squareSize;
    for (let x = 0; x < widthAmount; x++) {
        for (let y = 0; y < heightAmount; y++) {
            squares.push(new Square(x * squareSize, y * squareSize, squareSize, getRandomColor()));
        }
    }
    return squares;
}