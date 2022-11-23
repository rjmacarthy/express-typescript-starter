import { Elevator, IEvaluator, ElevatorParams, Direction } from './Elevator';



const defaultParams: ElevatorParams = {
    proximity: 1,
    direction: 200,
    status: 150,
};


export class CustomEvaluator implements IEvaluator {

    private params: ElevatorParams;
    constructor(params: ElevatorParams = defaultParams) {
        this.params = params;
    };

    evaluate(e: Elevator, from: number, to: number): number {
        let result: number = 1;
        for (const [param, wight] of Object.entries(this.params)) {

            switch (param) {
                case 'proximity':
                    result *= Math.abs(from - e.floor);
                    break;
                case 'direction':

                    const computeDirectionWight = () => {
                        if (from > e.floor) {
                            // passenger is above elevator.

                            if (e.direction === Direction.Up) {
                                // elevator is going up same direction of passenger
                                result *= 1 * wight;
                            } else {
                                // elevator is going down in opposite direction of passenger
                                result *= 2 * wight;
                            }

                        } else {
                            // passenger is below elevator.

                            if (e.direction === Direction.Down) {
                                // elevator is going Down same direction of passenger
                                result *= 1 * wight;
                            } else {
                                // elevator is going up in opposite direction of passenger
                                result *= 2 * wight;
                            }
                        }
                    }

                    if (from < to) {
                        // passenger going up
                        computeDirectionWight();
                    } else {
                        // passenger going down
                        computeDirectionWight();

                    }
                    break;
                case 'status':
                    // TODO:: implements this.
                    break;
            }
        }
        return result;
    }
}
