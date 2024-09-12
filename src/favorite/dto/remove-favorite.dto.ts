import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RemoveFavoriteDto {
  @ApiProperty({
    description: "ID de la película",
    example: "123",
  })
  @IsString()
  public movieId: string = "";

  @ApiProperty({
    description: "ID del Usuario",
    example: "cld1234567890",
  })
  @IsString()
  public userId: string = "";
}
