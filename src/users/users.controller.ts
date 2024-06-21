import { UsersService } from "./../users/users.service";
import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "src/auth/decorators/role-auth.decorator";
import { RoleGuard } from "src/auth/guards/role.guard";
import { AddRoleDto } from "src/roles/dto/add-role.dto";
import { BanUserDto } from "src/bans/dto/ban-user.dto";
import { BansService } from "src/bans/bans.service";
import { ValidationPipe } from "src/pipes/validation.pipe";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private bansService: BansService
  ) {}

  @ApiOperation({ summary: "Creating user" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() userDto: LoginUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Fetching all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Establishing a role" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: "Ban a user" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Post("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.bansService.ban(dto);
  }
}
