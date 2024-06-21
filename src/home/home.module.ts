import { Module, forwardRef } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/settings/settings.module';
import { ConnectedSystemsModule } from 'src/connected-systems/connected-systems.module';
import { MonitoringSystemsModule } from 'src/monitoring-systems/monitoring-systems.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [forwardRef(() => AuthModule), SettingsModule, ConnectedSystemsModule, MonitoringSystemsModule],
  exports: [HomeService],
})
export class HomeModule {}
