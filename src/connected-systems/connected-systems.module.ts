import { Module } from '@nestjs/common';
import { ConnectedSystemsService } from './connected-systems.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConnectedSystems } from './connected-systems.model';
import { MonitoringSystems } from 'src/monitoring-systems/monitoring-systems.model';
import { Settings } from 'src/settings/settings.model';
import { MonitoringSystemsModule } from 'src/monitoring-systems/monitoring-systems.module';

@Module({
  providers: [ConnectedSystemsService],
  imports: [SequelizeModule.forFeature([MonitoringSystems, ConnectedSystems, Settings]), MonitoringSystemsModule],
  exports: [ConnectedSystemsService],
})
export class ConnectedSystemsModule {}
