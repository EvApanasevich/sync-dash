import { Controller, Get, Param, Render, Req, Session, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { SettingsService } from 'src/settings/settings.service';
import { ConnectedSystemsService } from 'src/connected-systems/connected-systems.service';
import { MonitoringSystemsService } from 'src/monitoring-systems/monitoring-systems.service';
import { RefererGuard } from 'src/auth/guards/referer.guard';

@Controller()
export class HomeController {
  constructor(
    private monitoringSystemsService: MonitoringSystemsService,
    private connectedSystemsService: ConnectedSystemsService,
  ) {}

  @UseGuards(JWTAuthGuard)
  @Get()
  @Render('home')
  async homeView(@Req() req: Request, @Session() session: Record<string, any>) {
    const systems = await this.monitoringSystemsService.getAllMonitoringSystems();

    const userId = session.user.id;

    const connectedSystems = await this.connectedSystemsService.getAllConnectedSystemsByUserId(userId);

    const connectedSystemNames = connectedSystems.map(cs => cs.monitoringSystem.name);
    const sortedSystems = systems.filter(system => !connectedSystemNames.includes(system.name));

    const error = session.error;
    const host = session.host;
    const currentSystemName = session.currentSystemName;
    delete session.error;
    delete session.host;
    delete session.currentSystemName;

    return {
      title: 'Home',
      userId: userId,
      email: session.user.email,
      systems: sortedSystems,
      connectedSystems: connectedSystems,
      currentSystemName: currentSystemName,
      error: error,
      host: host,
    };
  }
}
