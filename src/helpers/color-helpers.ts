import { RgbColor } from "../genetics/grid/grid-dna";
import { DotColor } from "../genetics/dots/dots-dna";

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

export function getRandomDotColor(): DotColor {
    return Math.floor(<DotColor>Math.random() * 3);
}

export function getRandomRgbColor(): RgbColor {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return {
        red: r,
        green: g,
        blue: b
    };
}

export function rgbToHex(Color: RgbColor) {
    return PIXI.utils.rgb2hex([Color.red / 255, Color.green / 255, Color.blue / 255]);
}