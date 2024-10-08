import { Controller, Get, Post, Delete, Param, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from "@nestjs/swagger";
import { FavoriteService } from "./favorite.service";
import { CreateFavoriteDto, RemoveFavoriteDto } from "./dto";
import type { Favorite } from "@prisma/client";

@ApiTags("favorite")
@Controller("/favorite")
export class FavoriteController {
  public constructor(private readonly favoritesService: FavoriteService) {}
  //******************************************************************* */
  // TODO: Get
  @Get()
  @ApiOperation({ summary: "Obtener todos los favoritos de un usuario" })
  @ApiParam({ name: "userId", description: "ID del usuario", type: String })
  @ApiResponse({ status: 200, description: "Lista de favoritos del usuario." })
  @ApiResponse({ status: 404, description: "No se encontraron favoritos." })
  @HttpCode(HttpStatus.OK)
  public async findAll(@Param("userId") userId: string): Promise<Favorite[]> {
    return this.favoritesService.findAll(userId);
  }
  //******************************************************************* */
  // TODO: create
  @Post()
  @ApiOperation({ summary: "Agregar un nuevo favorito para un usuario" })
  @ApiBody({
    description: "Datos del favorito a agregar",
    type: CreateFavoriteDto,
  })
  @ApiResponse({ status: 201, description: "Favorito creado exitosamente." })
  @ApiResponse({ status: 400, description: "Solicitud incorrecta." })
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createFavoriteDto: CreateFavoriteDto): Promise<{ message: string }> {
    return this.favoritesService.create(createFavoriteDto);
  }
  //******************************************************************* */
  // TODO: Delete
  @Delete()
  @ApiOperation({ summary: "Eliminar un favorito de un usuario" })
  @ApiBody({
    description: "Datos del favorito a remover",
    type: RemoveFavoriteDto,
  })
  @ApiResponse({ status: 200, description: "Favorito eliminado exitosamente." })
  @ApiResponse({ status: 404, description: "Favorito no encontrado." })
  @HttpCode(HttpStatus.OK)
  public async remove(@Body() removeFavoriteDto: RemoveFavoriteDto): Promise<{ message: string }> {
    return this.favoritesService.remove(removeFavoriteDto);
  }
}
