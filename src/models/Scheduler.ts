import { Elevator, IEvaluator } from "./Elevator";


export class Scheduler {

    private elevators: Elevator[];
    private floors: number;
    private evaluator: IEvaluator;
    private queue: [];

    constructor(evaluator: IEvaluator, elevators: Elevator[], floors: number) {
        this.evaluator = evaluator;
        this.elevators = elevators;
        this.floors = floors;
    }

    public whichElevator(from: number, to: number): Elevator {
        let minEvaluation: number = Number.MAX_SAFE_INTEGER;
        let target: Elevator = this.elevators[0];

        for (const elevator of this.elevators) {
            let elevatorEvaluation: number = this.evaluator.evaluate(elevator, from, to);
            console.log(elevator.id, elevatorEvaluation)
            if (elevatorEvaluation < minEvaluation) {
                minEvaluation = elevatorEvaluation;
                target = elevator
            }
        }
        return target;
    }
    public request(from, to) {

    }

}
