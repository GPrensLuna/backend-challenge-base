import { TmdbService } from "./tmdb.service";
import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MovieResponse, GenreResponse } from "./dto/tmdb.dto";

@ApiTags("movies")
@Controller("movies")
export class TmdbController {
  public constructor(private readonly tmdbService: TmdbService) {}
  //******************************************************************* */
  @Get("/genres")
  @ApiOperation({ summary: "Retrieve a list of movie genres" })
  @ApiResponse({
    status: 200,
    description: "List of genres retrieved successfully",
    type: GenreResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public getGenres(): Promise<GenreResponse> {
    return this.tmdbService.getGenres();
  }
  //******************************************************************* */
  @Get("/:type")
  @ApiOperation({ summary: "Retrieve a list of movies based on type" })
  @ApiResponse({
    status: 200,
    description: "List of movies retrieved successfully",
    type: MovieResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getMovies(
    @Param("type") type: "popular" | "now_playing" | "upcoming" | "top_rated",
    @Query("page") page: string = "1",
    @Query("query") search?: string,
    @Query("with_genres") withGenres?: string,
  ): Promise<MovieResponse> {
    return this.tmdbService.getMovies(type, page, search, withGenres);
  }

  //******************************************************************* */
}
