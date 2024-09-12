import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class MovieDto {
  @ApiProperty({ description: "Título original de la película", example: "Deadpool & Wolverine" })
  @IsString()
  public title!: string;

  @ApiProperty({ description: "ID de la película", example: 533535 })
  @IsNumber()
  public id!: number;

  @ApiProperty({ description: "Título original de la película", example: "Deadpool & Wolverine" })
  @IsString()
  public original_title!: string;

  @ApiProperty({ description: "Descripción de la película", example: "A listless Wade Wilson..." })
  @IsString()
  public overview!: string;

  @ApiProperty({ description: "Fecha de lanzamiento de la película", example: "2024-07-24" })
  @IsString()
  public release_date!: string;

  @ApiProperty({
    description: "Ruta del póster de la película",
    example: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
  })
  @IsString()
  public poster_path!: string;

  @ApiProperty({
    description: "Ruta del fondo de la película",
    example: "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
  })
  @IsString()
  public backdrop_path!: string;

  @ApiProperty({ description: "Puntuación promedio de la película", example: 7.709 })
  @IsNumber()
  public vote_average!: number;

  @ApiProperty({ description: "Número de votos de la película", example: 2805 })
  @IsNumber()
  public vote_count!: number;

  @ApiProperty({ description: "Popularidad de la película", example: 2433.46 })
  @IsNumber()
  public popularity!: number;

  @ApiProperty({ description: "IDs de los géneros de la película", example: [28, 35, 878] })
  @IsArray()
  @IsNumber({}, { each: true })
  public genre_ids!: number[];

  @ApiProperty({ description: "Idioma original de la película", example: "en" })
  @IsString()
  public original_language!: string;

  @ApiProperty({ description: "Indica si la película es un video", example: false })
  @IsBoolean()
  public video!: boolean;

  @ApiProperty({ description: "Indica si la película es para adultos", example: false })
  @IsBoolean()
  public adult!: boolean;
}

export class CreateFavoriteDto {
  @ApiProperty({ description: "ID del Usuario", example: "cm0zapism0000o3nd8cdkivj6" })
  @IsString()
  public userId!: string;

  @ApiProperty({ description: "Datos de la película", type: MovieDto })
  @ValidateNested()
  @Type(() => MovieDto)
  public movie!: MovieDto;
}
