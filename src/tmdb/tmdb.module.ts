import { Module } from "@nestjs/common";
import { TmdbService } from "./tmdb.service";
import { ConfigModule } from "@nestjs/config";
import { TmdbController } from "./tmdb.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TmdbController],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
