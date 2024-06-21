import { IsEmail, IsString } from 'class-validator';

export class FortMonitorDto {
  @IsString()
  readonly host: string;
  @IsString()
  readonly systemName: string;
  @IsEmail()
  readonly login: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly lang: string;
}
