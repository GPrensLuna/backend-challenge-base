import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "user@example.com", description: "El correo electrónico del usuario" })
  public email: string = "";

  @ApiProperty({ example: "password123", description: "La contraseña del usuario" })
  public password: string = "";
}
