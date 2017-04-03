import { SudokuCell, SudokuGrid } from './genetics/sudoku/sudoku-dna';
import { ReadOnlySimpleEventEmitter, SimpleEventEmitter } from './common/simple-event-emitter';
import { SudokuPopulation } from "./genetics/sudoku/sudoku-population";
const BEST_FITNESS = (9 * 9) * 3;
export class SudokuGame {
    private hasFoundBest = false;
    private interval;
    private population: SudokuPopulation;
    private newPopulationEventEmitter: SimpleEventEmitter<SudokuGrid> = new SimpleEventEmitter<SudokuGrid>();

    private startDate: Date;
    newPopulation$: ReadOnlySimpleEventEmitter<SudokuGrid> = this.newPopulationEventEmitter.asObservable();
    constructor() {
    }


    init(popSize: number, mutationRate: number, crossoverRate: number, keepElitDna: number, initialCells: SudokuCell[]) {
        this.population = new SudokuPopulation(popSize, mutationRate, crossoverRate, keepElitDna, initialCells);
        this.population.generateFirstPop();
        this.startDate = new Date();


        this.interval = setInterval(() => {
            this.gameLoop();
            let elapsedSec = (new Date().valueOf() - this.startDate.valueOf()) / 1000;
            let bestPop = this.population.getBestPopulation();
            if (bestPop.pop.fitness == BEST_FITNESS) {
                this.hasFoundBest = true;
            }
            console.log(`Gen ${bestPop.generation} with fitness : ${bestPop.pop.fitness}/${BEST_FITNESS} // Elapsed Time : ${elapsedSec}sec`);
            this.newPopulationEventEmitter.emit(bestPop.pop);

            if (this.hasFoundBest) {
                clearInterval(this.interval);
            }
        }, 1);
    }

    /** The game loop */
    private gameLoop() {
        // Evolve the population
        this.population.nextGen();
    }
}