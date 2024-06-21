import { MonitoringSystems } from 'src/monitoring-systems/monitoring-systems.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MonitoringSystemsService {
  constructor(@InjectModel(MonitoringSystems) private monitoringSystemsRepository: typeof MonitoringSystems) {}

  async getSystemByName(systemName: string) {
    const system = await this.monitoringSystemsRepository.findOne({ where: { name: systemName } });
    return system.get();
  }

  async getAllMonitoringSystems() {
    const systems = await this.monitoringSystemsRepository.findAll({ raw: true });
    return systems;
  }
}
