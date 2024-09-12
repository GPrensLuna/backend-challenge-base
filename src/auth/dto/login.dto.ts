import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "user@example.com", description: "El correo electrónico del usuario" })
  public email: string = "";
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "password123", description: "La contraseña del usuario" })
  public password: string = "";
}
