import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
import { RegistrationUserDto } from "src/users/dto/registration-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: "Invalid email or password" });
    }
    const passwordEquals = await bcrypt.compare(loginUserDto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException({ message: "Invalid email or password" });
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    const token = this.generateToken(user);
    const response = { id: user.id, email: user.email, token: token };
    return response;
  }

  async registration(registrationUserDto: RegistrationUserDto) {
    const candidate = await this.userService.getUserByEmail(registrationUserDto.email);
    if (candidate) {
      throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST);
    }
    if (registrationUserDto.password !== registrationUserDto.confirmPassword) {
      throw new HttpException("Passwords don't match", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(registrationUserDto.password, 10);
    const user = await this.userService.createUser({ email: registrationUserDto.email, password: hashPassword });
    const token = this.generateToken(user);
    const response = { id: user.id, email: user.email, token: token };
    return response;
  }
}
