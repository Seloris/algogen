import { Square } from './genetics/grid';
import { DotPopulation } from './genetics/population';
import 'pixi.js';
import { rgbToHex } from './helpers';

const POP_SIZE = 500;
const SQUARE_SIZE = 80;

export class Game {
    private stage: PIXI.Container;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    private population: DotPopulation;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(800, 800, { antialias: false, transparent: false, resolution: 1 });
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
    }

    init() {
        this.population = new DotPopulation(POP_SIZE, 0.1, 0.03, this.renderer.width, this.renderer.height, SQUARE_SIZE);
        this.population.generateFirstPop();
        this.renderPopulation();

        this.gameLoop();
    }

    /** The game loop */
    private gameLoop() {
        // Evolve the population
        this.population.nextGen();
        this.renderPopulation();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    /** Link dots population to the game and link the sprite */
    renderPopulation() {
        this.stage.removeChildren(0, this.renderer.width * this.renderer.height);
        let bestPop = this.population.getBestPopulation();
        console.log(bestPop);
        console.log('fitness -> ' + bestPop.population.fitness);

        bestPop.population.squares.forEach(square => {
            this.renderSquare(square);
        });
        this.renderer.render(this.stage);
    }

    /** Add a dot to the stage */
    renderSquare(square: Square) {
        var graphics = new PIXI.Graphics();

        graphics.beginFill(rgbToHex(square.color));

        graphics.drawRect(square.x, square.y, square.size, square.size);
        this.stage.addChild(graphics);
    }
}

interface Coords {
    x: number;
    y: number;
}