import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateFavoriteDto, RemoveFavoriteDto } from "./dto";

@Injectable()
export class FavoriteService {
  public constructor(private readonly db: PrismaService) {}

  public async findAll(userId: string): Promise<
    {
      id: string;
      title: string;
      movieId: string;
      createdAt: Date;
      userId: string;
    }[]
  > {
    return this.db.favorite.findMany({
      where: { userId },
    });
  }

  public async create(createFavoriteDto: CreateFavoriteDto): Promise<{ message: string }> {
    const { title, movieId, userId } = createFavoriteDto;
    await this.db.favorite.create({
      data: { movieId, title, userId },
    });
    return { message: "Película agregada con éxito a favoritos" };
  }

  public async remove(removeFavoriteDto: RemoveFavoriteDto): Promise<{ message: string }> {
    const { movieId, userId } = removeFavoriteDto;

    const favorite = await this.db.favorite.findFirst({
      where: {
        movieId,
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
