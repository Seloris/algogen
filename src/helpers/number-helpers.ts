export function getRandomNumberBetween(inclusiveMin: number, exclusiveMax: number) : number {
    return inclusiveMin + Math.floor(Math.random() * exclusiveMax);
}