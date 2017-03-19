import { DotsPopulation } from './genetics/dots/dots-population';
import 'pixi.js';
import { colorToFilename, rgbToHex } from './helpers/color-helpers';
import { Dot, Dots } from './genetics/dots/dots-dna';

export class DotsGame {
    private stage: PIXI.Container;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    private population: DotsPopulation;
    private amountDots: number;


    dotSprites: PIXI.Sprite[] = [];
    sebSprite: PIXI.Sprite;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { antialias: false, transparent: false, resolution: 1 });
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
        this.stage.accessible = true;

        this.stage.hitArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);

        this.stage.addListener('mousemove', (e) => {
            let { clientX, clientY } = e.data.originalEvent;
            this.population.setEnemyPosition(clientX, clientY);
            this.updateEnemy(clientX, clientY);
        });

    }

    public init(popSize: number, mutationRate: number, crossoverRate: number, keepElitDna: number, amountDots: number) {
        PIXI.loader
            .add("./red-dot.png")
            .add("./green-dot.png")
            .add("./blue-dot.png")
            .add("./seb.png")
            .load(() => {
                this.renderEnemy();
                this.amountDots = amountDots;
                this.population = new DotsPopulation(popSize, mutationRate, crossoverRate, keepElitDna, this.renderer.width, this.renderer.height, amountDots);
                this.population.generateFirstPop();

                let best = this.population.getBestPopulation();
                this.renderDots(best.dots);
                this.renderer.render(this.stage);
                this.gameLoop();
            });
    }

    private showConsoleBest(best: any) {
        console.log('Generation :' + best.generation);
        console.log("Fitness -> " + best.dots.fitness);
        console.log("----------");
    }

    /** The game loop */
    private gameLoop() {
        // Evolve the population
        this.population.nextGen();
        let best = this.population.getBestPopulation();
        this.updateDots(best.dots)
        this.showConsoleBest(best);

        this.renderer.render(this.stage);
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private renderDots(dots: Dots) {

        dots.dots.forEach(dot => {
            let dotSprite = new PIXI.Sprite(PIXI.utils.TextureCache[`./${colorToFilename(dot.color)}`]);
            dotSprite.anchor.set(0.5);
            dotSprite.x = dot.x;
            dotSprite.y = dot.y;
            dotSprite.width = dot.dotSize;
            dotSprite.height = dot.dotSize;

            this.dotSprites.push(dotSprite);
            this.stage.addChild(dotSprite);
        });
    }

    private updateDots(dots: Dots) {
        dots.dots.forEach((dot, i) => {
            this.dotSprites[i].x = dot.x;
            this.dotSprites[i].y = dot.y;
            this.dotSprites[i].texture = PIXI.utils.TextureCache[`./${colorToFilename(dot.color)}`];
        });
    }

    private renderEnemy() {
        this.sebSprite = new PIXI.Sprite(PIXI.utils.TextureCache[`./seb.png`]);
        this.sebSprite.anchor.set(0.5);
        this.sebSprite.x = window.innerWidth / 2;
        this.sebSprite.y = window.innerHeight / 2;
        this.sebSprite.width = this.sebSprite.texture.width;
        this.sebSprite.height = this.sebSprite.texture.height;
        this.stage.addChild(this.sebSprite);
    }

    private updateEnemy(x: number, y: number) {
        this.sebSprite.x = x
        this.sebSprite.y = y
    }
}