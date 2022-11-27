import { Elevator, CustomEvaluator, Scheduler } from './../lib/elevator';

export class BuildingService {
     private _scheduler: Scheduler;
     private static _id: number = 0;
     public id: number;

     constructor(floors: number = 10, elevatorCount: number = 2) {

          const elevators = Array(elevatorCount).fill(1).map(_ => new Elevator())
          const evaluator = new CustomEvaluator();
          this._scheduler = new Scheduler(evaluator, elevators, floors);
          this.id = ++BuildingService._id;
     }

     public runSimulation() {
          // TODO:: add random simulation
          this._scheduler.requestMove(1, 8);
          this._scheduler.requestMove(1, 2);
          this._scheduler.requestMove(10, 1);
          this._scheduler.requestMove(2, 10);
     }
     public whichElevator(passengerFloor: number, passengerTarget: number) {
          return this._scheduler.whichElevator(passengerFloor, passengerTarget)
     }
     public requestMove(passengerFloor: number, passengerTarget: number) {
          this._scheduler.requestMove(passengerFloor, passengerTarget);
     }

     public status() {
          return this._scheduler.getStatus();
     }
     public getStatus() {
          return this._scheduler.status
     }
     public start() {
          this._scheduler.run();
     }
     public stop() {
          this._scheduler.stop();
     }
     public toJSON() {
          return {
               id: this.id,
               ...this.status()
          };
     }
};