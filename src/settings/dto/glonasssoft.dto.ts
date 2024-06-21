import { IsEmail, IsString } from 'class-validator';

export class GlonasssoftDto {
  @IsString()
  readonly host: string;
  @IsString()
  readonly systemName: string;
  @IsEmail()
  readonly login: string;
  @IsString()
  readonly password: string;
}
