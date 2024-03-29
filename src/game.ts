import { Dot } from './genetics/dot';
import { DotPopulation } from './genetics/population';
import 'pixi.js';

const POP_SIZE = 100;

export class Game {
    private stage: PIXI.Container;
    private dotTexture: any;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    private population: DotPopulation;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(800, 800, { antialias: false, transparent: false, resolution: 1 });
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
    }

    init() {
        PIXI.loader
            .add("./dot-texture.png")
            .load(this.setup.bind(this));
    }


    /** Setup called when textures are loaded */
    setup() {
        this.dotTexture = PIXI.utils.TextureCache['./dot-texture.png'];

        // init population
        this.population = new DotPopulation(POP_SIZE, 0.03, 0.03, this.renderer.width, this.renderer.height);
        this.population.generateFirstPop();
        this.renderPopulation();

        setInterval(() => {
            this.gameLoop();
        },
            100);
    }

    /** The game loop */
    private gameLoop() {
        // Evolve the population
        this.population.nextGen();
        this.renderPopulation();

        // requestAnimationFrame(this.gameLoop.bind(this));
    }

    /** Link dots population to the game and link the sprite */
    renderPopulation() {
        this.stage.removeChildren(0, POP_SIZE);
        this.population.dnas.forEach(dot => {
            this.renderDot(dot);
        });

        this.renderer.render(this.stage);
    }

    /** Add a dot to the stage */
    renderDot(dot: Dot) {
        let dotSprite = new PIXI.Sprite(this.dotTexture);
        dotSprite.anchor.set(0.5);
        dotSprite.x = dot.x;
        dotSprite.y = dot.y;
        dotSprite.width = dot.size;
        dotSprite.height = dot.size;
        this.stage.addChild(dotSprite);
    }
}

interface Coords {
    x: number;
    y: number;
}