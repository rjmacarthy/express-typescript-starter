import _ = require("lodash");
import { Elevator, IEvaluator } from "./Elevator";


export class Scheduler {

    private elevators: Elevator[];
    private evaluator: IEvaluator;
    public floors: number;
    public status: string = "off";
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
        if (this.status === "on") return;

        console.info(`Scheduler.run: running elevators ${this.elevators.length}`);
        for (const elevator of this.elevators) {
            elevator.run();
        }
        this.status = "on";
    }
    public stop() {
        if (this.status === "off") return;

        console.info(`Scheduler.stop: Stopping elevators ${this.elevators.length}`);
        for (const elevator of this.elevators) {
            elevator.stop();
        }
        this.status = "off";

    }
    public getStatus() {
        return {
            elevatorsCount: this.elevators.length,
            floors: this.floors,
            statuses: this.elevators.map(elevator => elevator.getStatus())
        }
    }


}
