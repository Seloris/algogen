import 'pixi.js';
import { rgbToHex } from "./helpers/color-helpers";
import { GridPopulation } from "./genetics/grid/grid-population";
import { Square } from "./genetics/grid/grid-dna";

export class GridGame {
    private stage: PIXI.Container;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    private population: GridPopulation;
    constructor() {
        this.renderer = PIXI.autoDetectRenderer(800, 800, { antialias: false, transparent: false, resolution: 1 });
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
    }

    init(popSize: number, mutationRate: number, crossoverRate: number, keepElitDna: number, squareSize: number) {
        this.population = new GridPopulation(popSize, mutationRate, crossoverRate, keepElitDna, this.renderer.width, this.renderer.height, squareSize);
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