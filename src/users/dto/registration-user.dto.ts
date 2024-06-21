import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegistrationUserDto {
  @ApiProperty({ example: "user@mail.ru", description: "Email" })
  @IsString()
  @IsEmail({}, { message: "Invalid email format" })
  readonly email: string;

  @ApiProperty({ example: "123Ab34", description: "Password" })
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @MaxLength(20, { message: "Password must not exceed 20 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  readonly password: string;

  @ApiProperty({ example: "123Ab34", description: "Password" })
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @MaxLength(20, { message: "Password must not exceed 20 characters" })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  readonly confirmPassword: string;
}
