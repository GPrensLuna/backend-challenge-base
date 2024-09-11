import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Correo electrónico del usuario",
  })
  @IsEmail({}, { message: "El email proporcionado no es válido." })
  public email: string = "";

  @ApiProperty({ example: "JohnDoe", description: "Nombre de usuario" })
  @IsString({ message: "El nombre de usuario debe ser un texto" })
  @MinLength(2, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  })
  @MaxLength(30, {
    message: "El nombre de usuario no puede tener más de 30 caracteres",
  })
  public username: string = "";

  @ApiProperty({
    example: "Password123!",
    description: "Contraseña del usuario",
  })
  @IsString({ message: "La contraseña debe ser un texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  public password: string = "";
}
