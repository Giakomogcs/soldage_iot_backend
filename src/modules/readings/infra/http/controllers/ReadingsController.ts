import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateReadingService from '@modules/readings/services/CreateReading.service';
import ShowAllReadingsService from '@modules/readings/services/ShowAllReadings.service';
import ShowLatestByClientService from '@modules/readings/services/ShowLatestByClient.service';
import ShowByFiltersService from '@modules/readings/services/ShowByFilters.service';
import DeleteOldByMachineService from '@modules/readings/services/DeleteOldByMachine.service';
import ShowLatestByMachineService from '@modules/readings/services/ShowLatestByMachine.service';
import ShowByMacAddressService from '@modules/machines/services/ShowByMacAddress.service';
import AppError from '@shared/errors/AppError';

export default class ReadingsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      mac_address,
      welding_current,
      welding_voltage,
      wire_speed,
      arc_status,
      currentL1,
      currentL2,
      currentL3,
      voltageL1,
      voltageL2,
      voltageL3,
      gas_flow,
    } = req.body;

    const createReadingService = container.resolve(CreateReadingService);

    const reading = await createReadingService.execute({
      mac_address,
      welding_current,
      welding_voltage,
      wire_speed,
      arc_status,
      currentL1,
      currentL2,
      currentL3,
      voltageL1,
      voltageL2,
      voltageL3,
      gas_flow,
    });

    const showByMacAddressService = container.resolve(ShowByMacAddressService);

    const machine = await showByMacAddressService.execute(mac_address);

    // Política de retenção de dados antigos
    if (machine) {
      const deleteOldByMachineService = container.resolve(DeleteOldByMachineService);

      await deleteOldByMachineService.execute(machine.id);
    }

    return res.json(classToClass(reading));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { machine_id } = req.query;
    const { begin_date } = req.query;
    const { final_date } = req.query;

    if (machine_id || begin_date || final_date) {
      const showByFilters = container.resolve(ShowByFiltersService);

      const readings = await showByFilters.execute({ machine_id, begin_date, final_date });

      return res.json(classToClass(readings));
    }

    throw new AppError('Nenhum filtro fornecido');
  }

  public async showByClient(req: Request, res: Response): Promise<Response> {
    const { client_id } = req.params;

    const showByClient = container.resolve(ShowLatestByClientService);

    const readings = await showByClient.execute(client_id);

    return res.json(classToClass(readings));
  }

  public async showAll(req: Request, res: Response): Promise<Response> {
    const showAll = container.resolve(ShowAllReadingsService);

    const readings = await showAll.execute();

    return res.json(classToClass(readings));
  }

  public async showByMachine(req: Request, res: Response): Promise<Response> {
    const { machine_id } = req.params;

    const showByMachine = container.resolve(ShowLatestByMachineService);

    const readings = await showByMachine.execute(machine_id);

    return res.json(classToClass(readings));
  }
}
