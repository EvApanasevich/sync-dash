import { Body, Controller, Get, Post, Query, Render, Req, Res, Session, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SettingsService } from './settings.service';
import { Response } from 'express';
import { MetaFleetDto } from './dto/metaFleet.dto';
import { ConnectedSystemsService } from 'src/connected-systems/connected-systems.service';
import { FortMonitorDto } from './dto/fortMonitor.dto';
import { GlonasssoftDto } from './dto/glonasssoft.dto';
import { RefererGuard } from 'src/auth/guards/referer.guard';

@UseGuards(JWTAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(
    private settingsService: SettingsService,
    private connectedSystemsService: ConnectedSystemsService,
  ) {}

  @UseGuards(RefererGuard)
  @Get('MetaFleet')
  @Render('settings-metafleet')
  async settingsMetafleetView(@Query('host') host: string, @Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    const userId = session.user.id;
    const connectedSystems = await this.connectedSystemsService.getAllConnectedSystemsByUserId(userId);

    return {
      systemName: 'MetaFleet',
      title: 'MetaFleet settings',
      userId: userId,
      email: session.user.email,
      connectedSystems: connectedSystems,
      currentSystemName: 'MetaFleet',
    };
  }

  @UseGuards(RefererGuard)
  @Get('Wialon')
  @Render('settings-wialon')
  async settingsWialonView(@Query('host') host: string, @Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    const userId = session.user.id;
    const connectedSystems = await this.connectedSystemsService.getAllConnectedSystemsByUserId(userId);

    return {
      systemName: 'Wialon',
      title: 'Wialon settings',
      userId: userId,
      email: session.user.email,
      connectedSystems: connectedSystems,
      currentSystemName: 'Wialon',
    };
  }

  @UseGuards(RefererGuard)
  @Get('FortMonitor')
  @Render('settings-fortmonitor')
  async settingsFortMonitorView(@Query('host') host: string, @Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    const userId = session.user.id;
    const connectedSystems = await this.connectedSystemsService.getAllConnectedSystemsByUserId(userId);

    return {
      systemName: 'FortMonitor',
      title: 'FortMonitor settings',
      userId: userId,
      email: session.user.email,
      connectedSystems: connectedSystems,
      currentSystemName: 'FortMonitor',
    };
  }

  @UseGuards(RefererGuard)
  @Get('Glonasssoft')
  @Render('settings-glonasssoft')
  async settingsGlonasssoftView(@Query('host') host: string, @Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    const userId = session.user.id;
    const connectedSystems = await this.connectedSystemsService.getAllConnectedSystemsByUserId(userId);

    return {
      systemName: 'Glonasssoft',
      title: 'Glonasssoft settings',
      userId: userId,
      email: session.user.email,
      connectedSystems: connectedSystems,
      currentSystemName: 'Glonasssoft',
    };
  }
}
