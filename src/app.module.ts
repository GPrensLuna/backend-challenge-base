import { Module } from "@nestjs/common";
import { TmdbModule } from "./tmdb/tmdb.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaService } from "./prisma/prisma.service";
import { FavoriteModule } from "./favorite/favorite.module";

@Module({
  imports: [AuthModule, UserModule, TmdbModule, FavoriteModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
