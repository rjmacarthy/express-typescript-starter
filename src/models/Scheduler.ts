import { Elevator, IEvaluator } from "./Elevator";


export class Scheduler {

    private elevators: Elevator[];
    private evaluator: IEvaluator;

    constructor(evaluator: IEvaluator, elevators: Elevator[]) {
        this.evaluator = evaluator;
        this.elevators = elevators;
    }

    public whichElevator(passengerFloor: number, passengerTarget: number): Elevator {
        let minEvaluation: number = Number.MAX_SAFE_INTEGER;
        let target: Elevator = this.elevators[0];

        for (const elevator of this.elevators) {
            let elevatorEvaluation: number = this.evaluator.evaluate(elevator, passengerFloor, passengerTarget);
            console.info(`Scheduler.whichElevator: Elevator ${elevator.id} wight is ${elevatorEvaluation}`);

            if (elevatorEvaluation < minEvaluation) {
                minEvaluation = elevatorEvaluation;
                target = elevator
            }
        }
        return target;
    }
    public requestMove(passengerFloor: number, passengerTarget: number) {
        // TODO:: add validation for movement.
        const bestElevator = this.whichElevator(passengerFloor, passengerTarget);
        console.info(`Scheduler.requestMove: Request to move from ${passengerFloor} to ${passengerTarget} using ${bestElevator.id}`);
        bestElevator.askForMove(passengerFloor, passengerTarget);
    }
    public run() {
        console.info(`Scheduler.run: running elevators ${this.elevators.length}}`);
        for (const elevator of this.elevators) {
            elevator.run();
        }
    }
    public stop() {
        console.info(`Scheduler.stop: Stopping elevators ${this.elevators.length}}`);
        for (const elevator of this.elevators) {
            elevator.stop();
        }
    }

}
