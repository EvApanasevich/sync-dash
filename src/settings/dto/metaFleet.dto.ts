import { IsEmail, IsString } from "class-validator";

export class MetaFleetDto {
  @IsString()
  readonly host: string;
  @IsString()
  readonly systemName: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly lang: string;
}
