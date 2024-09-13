import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateFavoriteDto, RemoveFavoriteDto } from "./dto";
import type { Favorite } from "@prisma/client";

@Injectable()
export class FavoriteService {
  public constructor(private readonly db: PrismaService) {}
  //******************************************************************* */
  // TODO: findAll
  public async findAll(userId: string): Promise<Favorite[]> {
    return this.db.favorite.findMany({
      where: { userId },
    });
  }
  //******************************************************************* */
  // TODO: create
  public async create(createFavoriteDto: CreateFavoriteDto): Promise<{ message: string }> {
    const { userId, movie } = createFavoriteDto;

    const userExists = await this.db.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException("Usuario no encontrado");
    }

    const movieExists = await this.db.favorite.findFirst({
      where: {
        userId,
        id: movie.id,
      },
    });

    if (movieExists) {
      throw new ConflictException("La película ya está en los favoritos");
    }

    await this.db.favorite.create({
      data: {
        userId: userId,
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        overview: movie.overview,
        release_date: new Date(movie.release_date),
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        genreIds: movie.genre_ids,
        original_language: movie.original_language,
        video: movie.video,
        adult: movie.adult,
      },
    });

    return { message: "Película agregada con éxito a favoritos" };
  }
  //******************************************************************* */
  // TODO: remove
  public async remove(removeFavoriteDto: RemoveFavoriteDto): Promise<{ message: string }> {
    const { movieId, userId } = removeFavoriteDto;
    const favorite = await this.db.favorite.findFirst({
      where: {
        id: parseInt(movieId),
        userId,
      },
    });
    if (!favorite) {
      throw new NotFoundException("Favorito no encontrado");
    }
    await this.db.favorite.delete({
      where: { id: favorite.id },
    });

    return { message: "Favorito eliminado exitosamente" };
  }
}
