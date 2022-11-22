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
  [Direction.Up]: "UP",
  [Direction.Down]: "DOWN",
}

const sleep = async (ms: number): Promise<void> => await new Promise(f => setTimeout(f, ms));

export class Elevator {
  private static _id: number = 0;
  id: number;
  status: Status
  direction: Direction
  floor: number

  constructor(status: Status = Status.Idle, direction: Direction = Direction.Standby, floor: number = 1) {
    this.id = ++Elevator._id;
    this.status = status;
    this.direction = direction;
    this.floor = floor;
  }
  public async moveToFloor(target: number, direction: Direction): Promise<void> {
    // TODO:: This needs to be moved or implmented using Queue
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
}
