import { Evaluator } from './Evaluator';
import { Elevator } from "./Elevator";

export class Scheduler {

    private elevators: Elevator[];
    private floors: number;
    private evaluator: Evaluator;
    private queue: [];

    constructor(evaluator: Evaluator, elevators: Elevator[], floors: number) {
        this.evaluator = evaluator;
        this.elevators = elevators;
        this.floors = floors;
    }

}
