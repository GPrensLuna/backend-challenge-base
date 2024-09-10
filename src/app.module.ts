import { Module } from "@nestjs/common";
import { TmdbModule } from "./tmdb/tmdb.module";
import { AuthModule } from "./router/auth/auth.module";
import { UserModule } from "./router/user/user.module";
import { PrismaService } from "./prisma/prisma.service";
import { FavoriteModule } from "./router/favorite/favorite.module";

@Module({
  imports: [AuthModule, UserModule, TmdbModule, FavoriteModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
