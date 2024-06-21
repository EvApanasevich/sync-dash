import { Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { MonitoringSystems } from "src/monitoring-systems/monitoring-systems.model";
import { MonitoringSystemsModule } from "src/monitoring-systems/monitoring-systems.module";
import { ConnectedSystems } from "src/connected-systems/connected-systems.model";
import { Settings } from "./settings.model";

@Module({
  providers: [SettingsService],
  imports: [SequelizeModule.forFeature([MonitoringSystems, ConnectedSystems, Settings]), MonitoringSystemsModule],
  exports: [SettingsService],
})
export class SettingsModule {}
