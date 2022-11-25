import { Elevator, IEvaluator, EvaluatorParams, Direction, Status } from './Elevator';



const defaultParams: EvaluatorParams = {
    proximity: 10,
    direction: 200,
    status: 150,
};


export class CustomEvaluator implements IEvaluator {

    private params: EvaluatorParams;
    constructor(params: EvaluatorParams = defaultParams) {
        this.params = params;
    };
    evaluate(e: Elevator, passengerFloor: number, passengerTarget: number): number {
        let result: number = 1;
        for (const [param, wight] of Object.entries(this.params)) {

            switch (param) {
                case 'proximity':
                    result += Math.abs(passengerFloor - e.floor) * wight;
                    break;
                case 'direction':

                    const computeDirectionWight = () => {
                        if (passengerFloor > e.floor) {
                            // passenger is above elevator.

                            if (e.direction === Direction.Up || e.direction === Direction.Standby) {
                                // elevator is going up same direction of passenger
                                result += 1 * wight;
                            } else {
                                // elevator is going down in opposite direction of passenger
                                result += 2 * wight;
                            }

                        } else {
                            // passenger is below elevator.

                            if (e.direction === Direction.Down || e.direction === Direction.Standby) {
                                // elevator is going Down same direction of passenger
                                result += 1 * wight;
                            } else {
                                // elevator is going up in opposite direction of passenger
                                result += 2 * wight;
                            }
                        }
                    }

                    if (passengerFloor < passengerTarget) {
                        // passenger going up
                        computeDirectionWight();
                    } else {
                        // passenger going down
                        computeDirectionWight();

                    }
                    break;
                case 'status':
                    switch (e.status) {
                        case Status.Idle:
                            result += 1 * wight;
                            break;
                        case Status.Moving:
                            result += 2 * wight;
                            break;
                        case Status.Faulty:
                            result = Number.MAX_SAFE_INTEGER;
                            break;
                    }
                    break;
            }
        }
        return result;
    }
}
