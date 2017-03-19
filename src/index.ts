
import { GridGame } from "./grid-game";
import { DotsGame } from "./dots-game";

const POP_SIZE = 200;
const MUTATION_RATE = 0.01;
const CROSSOVER_RATE = 0;
const KEEP_ELIT_DNA = 2;

// Grid
const GRID_SQUARE_SIZE = 80;

// Dots
const AMOUNT_DOTS = 150;


// let gridGame = new GridGame();
// gridGame.init(POP_SIZE, MUTATION_RATE, CROSSOVER_RATE, KEEP_ELIT_DNA, GRID_SQUARE_SIZE);

let dotsGame = new DotsGame();
dotsGame.init(POP_SIZE, MUTATION_RATE, CROSSOVER_RATE, KEEP_ELIT_DNA, AMOUNT_DOTS);

