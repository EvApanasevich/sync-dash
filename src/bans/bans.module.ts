import { Module, forwardRef } from "@nestjs/common";
import { BansController } from "./bans.controller";
import { BansService } from "./bans.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Ban } from "./bans.model";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/users.model";

@Module({
  controllers: [BansController],
  providers: [BansService],
  imports: [SequelizeModule.forFeature([Ban, User]), forwardRef(() => UsersModule)],
  exports: [BansService],
})
export class BansModule {}
