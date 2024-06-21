import { Module } from "@nestjs/common";
import { MonitoringSystemsService } from "./monitoring-systems.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { MonitoringSystems } from "./monitoring-systems.model";

@Module({
  providers: [MonitoringSystemsService],
  exports: [MonitoringSystemsService],
  imports: [SequelizeModule.forFeature([MonitoringSystems])],
})
export class MonitoringSystemsModule {}
