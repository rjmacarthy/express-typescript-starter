import { Elevator, CustomEvaluator, Scheduler } from './../lib/elevator';

export class BuildingService {
     private _scheduler: Scheduler;

     constructor(floors: number = 10) {
          // TODO:: provide a way to read from config object maybe or file
          const e1 = new Elevator();
          const e2 = new Elevator();
          const elevators = [e1, e2];

          const evaluator = new CustomEvaluator();
          this._scheduler = new Scheduler(evaluator, elevators, floors);
          this._scheduler.run();
     }

     public runSimulation() {
          this._scheduler.requestMove(1, 8);
          this._scheduler.requestMove(1, 2);
          this._scheduler.requestMove(10, 1);
          this._scheduler.requestMove(2, 10);
     }
     public whichElevator(passengerFloor, passengerTarget) {
          return this._scheduler.whichElevator(passengerFloor, passengerTarget)
     }
     public status() {
          return this._scheduler.getStatus();
     }
};