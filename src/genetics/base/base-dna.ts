export abstract class BaseDna {
    fitness: number = 0;

    public crossOver(parentB: BaseDna): BaseDna[] {
        return this.crossOver_imp(parentB);
    }

    public mutate() {
        this.mutation_imp();
    }

    public evaluate() {
        this.fitness = this.evaluate_imp();
    }

    /** Abstract Methods*/
    public abstract clone(): BaseDna;
    protected abstract evaluate_imp(): number;
    protected abstract mutation_imp();
    protected abstract crossOver_imp(parentB: BaseDna): BaseDna[];
}