import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SystemDto {
  @IsString()
  readonly selectedSystem: string;
}
