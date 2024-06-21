import { InjectModel } from '@nestjs/sequelize';
import { MonitoringSystems } from './../monitoring-systems/monitoring-systems.model';
import { Injectable } from '@nestjs/common';
import { MetaFleetDto } from './dto/metaFleet.dto';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { MonitoringSystemsService } from 'src/monitoring-systems/monitoring-systems.service';
import { ConnectedSystems } from 'src/connected-systems/connected-systems.model';
import { FortMonitorDto } from './dto/fortMonitor.dto';
import { GlonasssoftDto } from './dto/glonasssoft.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(MonitoringSystems) private readonly monitoringSystemsRepository: typeof MonitoringSystems,
    @InjectModel(ConnectedSystems) private readonly connectedSystemsRepository: typeof ConnectedSystems,
    private monitoringSystemsService: MonitoringSystemsService,
  ) {}
}
