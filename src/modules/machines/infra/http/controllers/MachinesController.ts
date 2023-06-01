import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMachineService from '@modules/machines/services/CreateMachine.service';
import ShowAllMachines from '@modules/machines/services/ShowAllMachines.service';
import ShowByClientService from '@modules/machines/services/ShowByClient.service';
import ShowMachineService from '@modules/machines/services/ShowMachine.service';
import UpdateMachineService from '@modules/machines/services/UpdateMachine.service';

export default class MachinesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { client_id, code, description, mac_address } = req.body;

    const createMachineService = container.resolve(CreateMachineService);

    const machine = await createMachineService.execute({
      client_id,
      code,
      description,
      mac_address,
    });

    return res.json(classToClass(machine));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const showAllMachines = container.resolve(ShowAllMachines);

    const machines = await showAllMachines.execute();

    return res.json(classToClass(machines));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { machine_id } = req.params;

    const showMachine = container.resolve(ShowMachineService);

    const machine = await showMachine.execute({ machine_id });

    return res.json(classToClass(machine));
  }

  public async showByClient(req: Request, res: Response): Promise<Response> {
    const { client_id } = req.params;

    const showByClient = container.resolve(ShowByClientService);

    const machine = await showByClient.execute(client_id);

    return res.json(classToClass(machine));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { machine_id } = req.params;
    const { code, client_id, description, mac_address } = req.body;

    const updateMachine = container.resolve(UpdateMachineService);

    const machine = await updateMachine.execute({ machine_id, code, client_id, description, mac_address });

    return res.json(classToClass(machine));
  }
}
