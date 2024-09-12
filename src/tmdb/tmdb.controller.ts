import { TmdbService } from "./tmdb.service";
import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MovieResponse, GenreResponse, MovieDetailResponse } from "./dto/tmdb.dto";

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
  @Get("/:type/genero/:genreId")
  @ApiOperation({ summary: "Retrieve a list of movies based on type and genre" })
  @ApiResponse({
    status: 200,
    description: "List of movies retrieved successfully based on type and genre",
    type: MovieResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getMoviesByGenre(
    @Param("type") type: "popular" | "now_playing" | "upcoming" | "top_rated",
    @Param("genreId") genreId: string,
    @Query("page") page: string = "1",
  ): Promise<MovieResponse> {
    return this.tmdbService.getMoviesByGenre(type, genreId, page);
  }
  //******************************************************************* */
  @Get("/detail/:id")
  @ApiOperation({ summary: "Retrieve details of a movie by ID" })
  @ApiResponse({
    status: 200,
    description: "Details of the movie retrieved successfully",
    type: MovieDetailResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getMovieDetails(@Param("id") id: string): Promise<MovieDetailResponse> {
    return this.tmdbService.getMovieDetails(id);
  }
}
