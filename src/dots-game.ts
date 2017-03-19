import { DotsPopulation } from './genetics/dots/dots-population';
import 'pixi.js';
import { colorToFilename, rgbToHex } from './helpers/color-helpers';
import { Dot } from "./genetics/dots/dots-dna";

export class DotsGame {
    private stage: PIXI.Container;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    private population: DotsPopulation;
    private amountDots: number;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(800, 800, { antialias: false, transparent: false, resolution: 1 });
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
    }

    public init(popSize: number, mutationRate: number, crossoverRate: number, keepElitDna: number, amountDots: number) {
        PIXI.loader
            .add("./red-dot.png")
            .add("./green-dot.png")
            .add("./blue-dot.png")
            .load(() => {
                this.amountDots = amountDots;
                this.population = new DotsPopulation(popSize, mutationRate, crossoverRate, keepElitDna, this.renderer.width, this.renderer.height, amountDots);
                this.population.generateFirstPop();
                this.renderPopulation();

                this.gameLoop();
            });
    }

    /** The game loop */
    private gameLoop() {
        // Evolve the population
        this.population.nextGen();
        this.renderPopulation();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    /** Link dots population to the game and link the sprite */
    private renderPopulation() {
        this.stage.removeChildren(0, this.amountDots); 0
        let bestPop = this.population.getBestPopulation();
        console.log(bestPop);
        console.log('fitness -> ' + bestPop.population.fitness);

        bestPop.population.dots.forEach(dot => {
            this.renderDot(dot);
        });
        this.renderer.render(this.stage);
    }

    /** Add a dot to the stage */
    private renderDot(dot: Dot) {
        let dotSprite = new PIXI.Sprite(PIXI.utils.TextureCache[`./${colorToFilename(dot.color)}`]);
        dotSprite.anchor.set(0.5);
        dotSprite.x = dot.x;
        dotSprite.y = dot.y;
        dotSprite.width = dot.dotSize;
        dotSprite.height = dot.dotSize;
        this.stage.addChild(dotSprite);
    }
}