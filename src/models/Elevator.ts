
const VELOCITY_PER_FLOOR_SEC = 2 * 1000;

export enum Status {
  Idle = 0,
  Moving = 1,
  Faulty = 2,
}

export enum Direction {
  Standby = 0,
  Up = 1,
  Down = 2
}

const directionMap = {
  [Direction.Standby]: "Standby",
  [Direction.Up]: "UP",
  [Direction.Down]: "DOWN",
}

const statusMap = {
  [Status.Idle]: "Idle",
  [Status.Faulty]: "Faulty",
  [Status.Moving]: "Moving",
}


const sleep = async (ms: number): Promise<void> => await new Promise(f => setTimeout(f, ms));


export interface IEvaluator {
  evaluate(e: Elevator, passengerFloor: number, passengerTarget: number): number
};

export type EvaluatorParams = {
  proximity: number,
  direction: number,
  status: number,
}

interface IElevatorEvent {
  passengerFloor: number
  passengerTarget: number
};
export class Elevator {
  private static _id: number = 0;
  private _queue: IElevatorEvent[] = [];
  private _interval: NodeJS.Timer;

  id: number;
  status: Status
  direction: Direction
  floor: number

  constructor(floor: number = 1) {
    this.id = ++Elevator._id;
    this.status = Status.Idle;
    this.direction = Direction.Standby;
    this.floor = floor;
  }

  public askForMove(passengerFloor: number, passengerTarget: number) {
    console.info(`Elevator.askForMove: Elevator ${this.id} recived request to move from floor ${passengerFloor} to floor ${passengerTarget}`);
    // add to the elevator queue.
    this._queue.push({
      passengerFloor,
      passengerTarget,
    });
  }

  private async move() {
    if (this._queue.length !== 0 && this.status === Status.Idle) {
      this.status = Status.Moving;
      await this.closeDoors();
      const moveEvent: IElevatorEvent = this._queue[0];

      this.direction = this.floor < moveEvent.passengerTarget ? Direction.Up : Direction.Down;
      console.info(`Elevator.move: Elevator ${this.id} moving from ${this.floor} to ${moveEvent.passengerTarget} - Direction  ${directionMap[this.direction]} - Status is ${statusMap[this.status]} - current floor ${this.floor}`);

      await sleep(VELOCITY_PER_FLOOR_SEC * Math.abs(moveEvent.passengerTarget - this.floor));
      this.floor = this._queue.shift().passengerTarget;
      await this.openDoors();

      console.info(`Elevator.move: Elevator ${this.id} finished move to ${moveEvent.passengerTarget} - Status is ${statusMap[this.status]} - current floor ${this.floor} `);

    }
  }

  private async openDoors() {
    this.status = Status.Idle;
    console.info(`Elevator.openDoors: Elevator ${this.id} opening doors - Status is ${statusMap[this.status]}`);
    await sleep(1000);
  }

  private async closeDoors() {
    console.info(`Elevator.closeDoors: Elevator ${this.id} closing doors - Status is ${statusMap[this.status]}`);
    await sleep(1000);
  }
  public run() {
    this._interval = setInterval(() => this.move(), 500);
    console.info(`Elevator.run: Elevator ${this.id} is  running`);
  }

  public stop() {
    if (this._interval) clearInterval(this._interval);
    console.info(`Elevator.stop: Elevator ${this.id} stopped`)
  }

  public toJSON() {
    const { _queue, _interval, ...readProperties } = this;
    return { ...readProperties, status: statusMap[this.status], direction: directionMap[this.direction], };
  }
}
