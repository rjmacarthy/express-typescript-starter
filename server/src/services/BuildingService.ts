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
          console.log("BuildingService.simulation: Started");
          const SIMULATION_REQUEST_INTERVAL = 5 * 1000; // 5 seconds
          const SIMULATION_TIMEOUT = 2 * 60 * 1000; // 2 minutes

          const _this = this;
          const buildingFloors: number = _this._scheduler.floors;

          const simulationId = setInterval(() => {
               _this._scheduler.requestMove(Math.floor(Math.random() * buildingFloors) + 1, Math.floor(Math.random() * buildingFloors) + 1);

          }, SIMULATION_REQUEST_INTERVAL);


          setTimeout(() => {
               clearInterval(simulationId);
               console.log("BuildingService.simulation: Ended");
          }, SIMULATION_TIMEOUT);

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