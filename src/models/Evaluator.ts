import { Elevator } from './Elevator';

type ElevatorParams = {
    proximity: number,
    direction: number,
    status: number,
}

const defaultParams: ElevatorParams = {
    proximity: 100,
    direction: 200,
    status: 150,
};

export class Evaluator {

    private params: ElevatorParams;
    constructor(params: ElevatorParams = defaultParams) {
        this.params = params;
    };
    evaluate(e: Elevator, from: number, to: number) {
    }
}
