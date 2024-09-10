import { ApiProperty } from "@nestjs/swagger";

export class UserDataDto {
  @ApiProperty({ example: "123", description: "ID del usuario" })
  public id: string = "";

  @ApiProperty({
    example: "user@example.com",
    description: "Correo electrónico del usuario",
  })
  public email: string = "";

  @ApiProperty({ example: "JohnDoe", description: "Nombre de usuario" })
  public username: string = "";
}

export class UserResponseDto {
  @ApiProperty({
    example: "Usuario registrado con éxito",
    description: "Mensaje de confirmación",
  })
  public message: string = "";

  @ApiProperty({
    type: UserDataDto,
    description: "Datos del usuario registrado",
  })
  public data?: UserDataDto;
  public accessToken?: string;
}
