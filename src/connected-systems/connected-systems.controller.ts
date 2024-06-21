import { Body, Controller, Get, Post, Query, Render, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { ConnectedSystemsService } from './connected-systems.service';
import { MetaFleetDto } from 'src/settings/dto/metaFleet.dto';
import { FortMonitorDto } from 'src/settings/dto/fortMonitor.dto';
import { GlonasssoftDto } from 'src/settings/dto/glonasssoft.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RefererGuard } from 'src/auth/guards/referer.guard';

@UseGuards(JWTAuthGuard)
@Controller('connect')
export class ConnectedSystemsController {
  constructor(private connectedSystemsService: ConnectedSystemsService) {}

  @UseGuards(RefererGuard)
  @Get('MetaFleet')
  @Render('login-form-metafleet')
  async loginMetafleetView(@Query('host') host: string, @Req() req: Request, @Res() res: Response) {
    return {
      systemName: 'MetaFleet',
      host: host,
      layout: false,
    };
  }

  @Post('MetaFleet')
  async loginMetafleet(@Body() metaFleetDto: MetaFleetDto, @Res() res: Response, @Session() session: Record<string, any>) {
    try {
      const userId = session.user.id;
      const response = await this.connectedSystemsService.saveLoginMetaFleet(metaFleetDto, userId);
      return res.redirect('/');
    } catch (err) {
      session.error = err.message;
      session.host = metaFleetDto.host;
      session.currentSystemName = metaFleetDto.systemName;
      return res.redirect('/');
    }
  }

  @Get('Wialon')
  @Render('login-form-wialon')
  async loginWialonView(@Query('host') host: string, @Req() req: Request, @Res() res: Response) {
    const referer = req.headers.referer;
    if (!referer) {
      return res.redirect('/');
    }

    const src = `${host}/login.html?access_type=-1&activation_time=0&duration=0&redirect_uri=${host}/post_token.html`;
    return {
      systemName: 'Wialon',
      host: host,
      src: src,
      layout: false,
    };
  }

  @Post('Wialon')
  async loginWialon(@Body() body: any, @Res() res: Response, @Session() session: Record<string, any>) {
    const userId = session.user.id;
    const response = await this.connectedSystemsService.saveLoginWialon(body.token, userId, body.systemName);
    return res.redirect('/');
  }

  @Get('FortMonitor')
  @Render('login-form-fortmonitor')
  async loginFortMonitorView(@Query('host') host: string, @Req() req: Request, @Res() res: Response) {
    const referer = req.headers.referer;
    if (!referer) {
      return res.redirect('/');
    }

    return {
      systemName: 'FortMonitor',
      host: host,
      layout: false,
    };
  }

  @Post('FortMonitor')
  async loginFortMonitor(@Body() fortMonitorDto: FortMonitorDto, @Res() res: Response, @Session() session: Record<string, any>) {
    try {
      const userId = session.user.id;
      const response = await this.connectedSystemsService.saveLoginFortMonitor(fortMonitorDto, userId);
      return res.redirect('/');
    } catch (err) {
      session.error = err.message;
      session.host = fortMonitorDto.host;
      session.currentSystemName = fortMonitorDto.systemName;
      return res.redirect('/');
    }
  }

  @Get('Glonasssoft')
  @Render('login-form-glonasssoft')
  async loginGlonasssoftView(@Query('host') host: string, @Req() req: Request, @Res() res: Response) {
    const referer = req.headers.referer;
    if (!referer) {
      return res.redirect('/');
    }

    return {
      systemName: 'Glonasssoft',
      host: host,
      layout: false,
    };
  }

  @Post('Glonasssoft')
  async loginGlonasssoft(@Body() glonasssoftDto: GlonasssoftDto, @Res() res: Response, @Session() session: Record<string, any>) {
    try {
      const userId = session.user.id;
      const response = await this.connectedSystemsService.saveLoginGlonasssoft(glonasssoftDto, userId);
      return res.redirect('/');
    } catch (err) {
      session.error = err.message;
      session.host = glonasssoftDto.host;
      session.currentSystemName = glonasssoftDto.systemName;
      return res.redirect('/');
    }
  }
}
