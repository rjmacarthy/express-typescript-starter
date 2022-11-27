import { Elevator, IEvaluator } from "./Elevator";


export class Scheduler {

    private elevators: Elevator[];
    private evaluator: IEvaluator;
    private floors: number;

    constructor(evaluator: IEvaluator, elevators: Elevator[], floors: number) {
        this.evaluator = evaluator;
        this.elevators = elevators;
        this.floors = floors;
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
        if (passengerFloor > this.floors) {
            console.info("Scheduler.requestMove: passengerFloor is not enabled")
            return;
        };

        const bestElevator = this.whichElevator(passengerFloor, passengerTarget);
        console.info(`Scheduler.requestMove: Request to move from ${passengerFloor} to ${passengerTarget} using ${bestElevator.id}`);
        bestElevator.askForMove(passengerFloor, passengerTarget);
    }
    public run() {
        console.info(`Scheduler.run: running elevators ${this.elevators.length}`);
        for (const elevator of this.elevators) {
            elevator.run();
        }
    }
    public stop() {
        console.info(`Scheduler.stop: Stopping elevators ${this.elevators.length}`);
        for (const elevator of this.elevators) {
            elevator.stop();
        }
    }
    public getStatus() {
        return {
            elevatorsCount: this.elevators.length,
            floors: this.floors,
            statuses: this.elevators.reduce((acc, elevator) => {
                acc[`elevator_${elevator.id}`] = {
                    id: elevator.id,
                    status: elevator.getStatus()
                };
                return acc;
            }, {})
        }
    }


}
