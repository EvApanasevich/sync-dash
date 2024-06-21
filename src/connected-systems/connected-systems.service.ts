import { format } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { ConnectedSystems } from './connected-systems.model';
import { InjectModel } from '@nestjs/sequelize';
import { MonitoringSystems } from 'src/monitoring-systems/monitoring-systems.model';
import * as bcrypt from 'bcryptjs';
import { MetaFleetDto } from 'src/settings/dto/metaFleet.dto';
import { FortMonitorDto } from 'src/settings/dto/fortMonitor.dto';
import { GlonasssoftDto } from 'src/settings/dto/glonasssoft.dto';
import { MonitoringSystemsService } from 'src/monitoring-systems/monitoring-systems.service';

@Injectable()
export class ConnectedSystemsService {
  constructor(
    @InjectModel(ConnectedSystems) private connectedSystemsRepository: typeof ConnectedSystems,
    private monitoringSystemsService: MonitoringSystemsService,
  ) {}

  async getAllConnectedSystemsByUserId(userId: string) {
    const connectedSystems = await this.connectedSystemsRepository.findAll({
      where: { userId: userId },
      include: [
        {
          model: MonitoringSystems,
          attributes: ['id', 'name'],
        },
      ],
    });
    return connectedSystems.map(system => {
      const formattedSystem = system.toJSON();

      formattedSystem.createdAt = format(new Date(formattedSystem.createdAt), 'dd-MM-yyyy HH:mm');
      formattedSystem.updatedAt = format(new Date(formattedSystem.updatedAt), 'dd-MM-yyyy HH:mm');
      return formattedSystem;
    });
  }

  async saveLoginMetaFleet(metaFleetDto: MetaFleetDto, userId: number): Promise<any> {
    const { host, systemName, email, password, lang } = metaFleetDto;

    // host  (http://api.mechatronics.by:8080)
    const url = `${host}/api/3/login`;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('lang', lang);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.json();
      if (response.status === 404) {
        throw new Error(`Invalid login or password. Try again.`);
      }
    }

    const result = await response.json();

    const system = await this.monitoringSystemsService.getSystemByName(systemName);

    const hashPassword = await bcrypt.hash(password, 10);

    await this.connectedSystemsRepository.upsert(
      {
        login: email,
        password: hashPassword,
        lang: lang,
        token: result.token,
        userId: userId,
        systemId: system.id,
      },
      {
        conflictFields: ['userId', 'systemId'],
      },
    );

    return result;
  }

  async saveLoginWialon(token: string, userId: number, systemName: string): Promise<any> {
    const system = await this.monitoringSystemsService.getSystemByName(systemName);

    const result = await this.connectedSystemsRepository.upsert(
      {
        token: token,
        userId: userId,
        systemId: system.id,
      },
      {
        conflictFields: ['userId', 'systemId'],
      },
    );

    return result;
  }

  async saveLoginFortMonitor(fortMonitorDto: FortMonitorDto, userId: number): Promise<any> {
    const { host, systemName, login, password, lang } = fortMonitorDto;

    // host (https://ts.mechatronics.by)
    const url = `${host}/api/integration/v1/connect?login=${login}&password=${password}&lang=${lang}`;

    const response = await fetch(url);
    const res = await response.json();

    if (res !== 'Ok') {
      throw new Error(`Invalid login or password. Try again.`);
    }

    const sessionId = response.headers.get('sessionId');

    const system = await this.monitoringSystemsService.getSystemByName(systemName);

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await this.connectedSystemsRepository.upsert(
      {
        login: login,
        password: hashPassword,
        lang: lang,
        token: sessionId,
        userId: userId,
        systemId: system.id,
      },
      {
        conflictFields: ['userId', 'systemId'],
      },
    );

    return result;
  }

  async saveLoginGlonasssoft(glonasssoftDto: GlonasssoftDto, userId: number): Promise<any> {
    const { host, systemName, login, password } = glonasssoftDto;

    // host  (https://hosting.glonasssoft.ru)
    const url = `${host}/api/v3/auth/login`;

    const payload = JSON.stringify({
      login: login,
      password: password,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    const res = await response.json();

    if (res.Error) {
      throw new Error(`Invalid login or password. Try again.`);
    }

    const system = await this.monitoringSystemsService.getSystemByName(systemName);

    const hashPassword = await bcrypt.hash(password, 10);

    await this.connectedSystemsRepository.upsert(
      {
        login: login,
        password: hashPassword,
        token: res.AuthId,
        userId: userId,
        systemId: system.id,
      },
      {
        conflictFields: ['userId', 'systemId'],
      },
    );

    return res;
  }
}
