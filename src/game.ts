import { DotPopulation } from './genetics/population';
import 'pixi.js';

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

    setup() {
        this.dotTexture = PIXI.utils.TextureCache['./dot-texture.png'];
        this.population.generateFirstPop();
        this.renderer.render(this.stage);
        
        this.gameLoop();
    }

    private gameLoop() {
        requestAnimationFrame(this.gameLoop);
        this.renderer.render(this.stage);
    }

    renderDot(x: number, y: number) {
        let dotSprite = new PIXI.Sprite(PIXI.loader.resources["./dot-texture.png"].texture);
        dotSprite.anchor.set(0.5);
        dotSprite.x = x;
        dotSprite.y = y;
        dotSprite.width = 10;
        dotSprite.height = 10;

        this.stage.addChild(dotSprite);
        this.renderer.render(this.stage);
    }
}

interface Coords {
    x: number;
    y: number;
}