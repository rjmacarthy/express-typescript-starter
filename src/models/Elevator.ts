
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
  floors: number;
  constructor(floors: number, status: Status = Status.Idle, direction: Direction = Direction.Standby, floor: number = 1) {
    this.id = ++Elevator._id;
    this.status = status;
    this.direction = direction;
    this.floor = floor;
    this.floors = floors;
  }
  public async moveToFloor(target: number, direction: Direction): Promise<void> {
    // TODO:: This needs to be moved or implemented using Queue
    while (this.status === Status.Moving) {
      await sleep(VELOCITY_PER_FLOOR_SEC)
    }

    try {
      console.info(`moveToFloor: Start moving to floor: ${target} Direction: ${directionMap[direction]}`);

      this.status = Status.Moving;
      this.direction = direction;

      await sleep(VELOCITY_PER_FLOOR_SEC * Math.abs(target - this.floor));
      this.floor = target;
    } catch (error) {
      this.status = Status.Faulty;
      console.info(`moveToFloor: Elevator Failed to move`);
    } finally {
      this.status = Status.Idle;
      console.info(`moveToFloor: Elevator finished move, status is Idle`);
    }
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
      await this.closeDoors();

      this.status = Status.Moving;
      const moveEvent: IElevatorEvent = this._queue[0];
      this.direction = this.floor < moveEvent.passengerTarget ? Direction.Up : Direction.Down;
      console.info(`Elevator.move: Elevator ${this.id} moving from ${this.floor} to ${moveEvent.passengerTarget} - Direction  ${directionMap[this.direction]} - Status is ${statusMap[this.status]} - current floor ${this.floor}`);

      await sleep(VELOCITY_PER_FLOOR_SEC * Math.abs(moveEvent.passengerTarget - this.floor));
      this.floor = this._queue.shift().passengerTarget;
      await this.openDoors();

      console.info(`Elevator.move: Elevator ${this.id} finished move from to ${moveEvent.passengerTarget} - Status is ${statusMap[this.status]} - current floor ${this.floor} `);

    }
  }

  private async openDoors() {
    this.status = Status.Idle;
    console.info(`Elevator.openDoors: Elevator ${this.id} opening doors - Status is ${this.status}`);
    await sleep(1000);
  }

  private async closeDoors() {
    console.info(`Elevator.closeDoors: Elevator ${this.id} closing doors - Status is ${this.status}`);
    await sleep(1000);
  }
  public run() {
    this._interval = setInterval(() => this.move(), 1000);
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
