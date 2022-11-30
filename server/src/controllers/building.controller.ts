import { BuildingService } from '../services/BuildingService';
import { Request, Response } from 'express'




const _buildings: BuildingService[] = [];

export default class BuildingController {

  public index(req: Request, res: Response, next: Function): Response<any> {

    return res.json({
      ok: true,
      data: _buildings
    });
  }
  public get(req: Request, res: Response): Response<any> {
    const { id } = req.params;

    const building: BuildingService = _buildings.find(building => building.id === Number(id));
    if (!building) {
      return res.status(404).json({
        ok: false,
        message: 'Building not found',
      })
    }

    return res.json({ ok: true, data: building });
  }

  public which(req: Request, res: Response): Response<any> {
    const { id } = req.params;
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        ok: false,
        message: '[from, to] query params is required',
      });
    }

    const building: BuildingService = _buildings.find(building => building.id === Number(id));

    if (!building) {
      return res.status(404).json({
        ok: false,
        message: 'Building not found',
      })
    }

    try {
      const elevator = building.whichElevator(Number(from), Number(to));
      return res.json({ ok: true, elevator })

    } catch (error) {
      console.error("BuildingController.which: failure occurs", error);
      return res.status(500).send({ error: "Something went wrong" });
    }

  }

  public movePassenger(req: Request, res: Response): Response<any> {
    const { id } = req.params;
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        ok: false,
        message: '[from, to] query params is required',
      });
    }

    const building: BuildingService = _buildings.find(building => building.id === Number(id));
    if (!building) {
      return res.status(404).json({
        ok: false,
        message: 'Building not found',
      })
    }

    if (building.getStatus() === "off") {
      return res.status(400).json({
        ok: false,
        message: 'The building is off, Please make sure it"s on',
      })
    }

    try {
      building.requestMove(Number(from), Number(to));
      return res.json({ ok: true });

    } catch (error) {
      console.error("BuildingController.which: failure occurs", error);
      return res.status(500).send({ error: "Something went wrong" });
    }

  }

  public post(req: Request, res: Response): Response<any> {
    const { floorNum, elevatorNum } = req.body;

    if (!floorNum || !elevatorNum) {
      return res.status(400).json({
        ok: false,
        message: "floorNum and elevatorNum are required"
      })
    }

    const building = new BuildingService(Number(floorNum), Number(elevatorNum));
    _buildings.push(building);

    return res.status(201).json({ ok: true, building });
  }

  public start(req: Request, res: Response): Response<any> {
    const { id } = req.params;

    const building: BuildingService = _buildings.find(building => building.id === Number(id));
    if (!building) {
      return res.status(404).json({
        ok: false,
        message: 'Building not found',
      })
    }

    building.start();
    return res.json({ ok: true });
  }

  public stop(req: Request, res: Response): Response<any> {
    const { id } = req.params;

    const building: BuildingService = _buildings.find(building => building.id === Number(id));
    if (!building) {
      return res.status(404).json({
        ok: false,
        message: 'Building not found',
      })
    }

    building.stop();
    return res.json({ ok: true });
  }
  public startSimulation(req: Request, res: Response): Response<any> {
    const { id } = req.params;

    const building: BuildingService = _buildings.find(building => building.id === Number(id));
    if (!building) {
      return res.status(404).json({
        ok: false,
        message: 'Building not found',
      })
    }
    building.start();
    building.runSimulation();

    return res.json({ ok: true });
  }

}

export const buildingController = new BuildingController();
