import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { Ban } from "./bans/bans.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { BansModule } from "./bans/bans.module";
import { UserRoles } from "./user-roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
import { SettingsController } from "./settings/settings.controller";
import { SettingsModule } from "./settings/settings.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { MonitoringSystems } from "./monitoring-systems/monitoring-systems.model";
import { MonitoringSystemsController } from "./monitoring-systems/monitoring-systems.controller";
import { MonitoringSystemsModule } from "./monitoring-systems/monitoring-systems.module";
import { ConnectedSystems } from "./connected-systems/connected-systems.model";
import { ConnectedSystemsController } from './connected-systems/connected-systems.controller';
import { ConnectedSystemsModule } from './connected-systems/connected-systems.module';

@Module({
  controllers: [SettingsController, MonitoringSystemsController, ConnectedSystemsController],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Ban, Role, UserRoles, MonitoringSystems, ConnectedSystems],
      autoLoadModels: true,
    }),
    UsersModule,
    BansModule,
    RolesModule,
    AuthModule,
    HomeModule,
    SettingsModule,
    NotFoundModule,
    MonitoringSystemsModule,
    ConnectedSystemsModule,
  ],
})
export class AppModule {}
