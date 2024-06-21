import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ban } from "./bans.model";
import { BanUserDto } from "./dto/ban-user.dto";
import { User } from "src/users/users.model";

@Injectable()
export class BansService {
  constructor(
    @InjectModel(Ban) private banRepository: typeof Ban,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const banned = await this.banRepository.create({ user_id: dto.userId, reason: dto.banReason });
    return banned;
  }
}
