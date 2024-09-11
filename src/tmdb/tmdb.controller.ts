import { TmdbService } from "./tmdb.service";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MovieResponse, GenreResponse } from "./dto/tmdb.dto";

@ApiTags("movies")
@Controller("movies")
export class TmdbController {
  public constructor(private readonly tmdbService: TmdbService) {}

  @Get("/popular")
  @ApiOperation({ summary: "Retrieve a list of popular movies" })
  @ApiResponse({
    status: 200,
    description: "List of popular movies retrieved successfully",
    type: MovieResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getPopularMovies(
    @Query("page") page: string = "1",
    @Query("limit") limit?: number,
    @Query("filters") filters?: string,
  ): Promise<MovieResponse> {
    const filterParams: Record<string, string> = filters ? JSON.parse(filters) : {};
    return this.tmdbService.getPopularMovies(page, limit, filterParams);
  }

  @Get("/now_playing")
  @ApiOperation({ summary: "Retrieve a list of movies currently playing in theaters" })
  @ApiResponse({
    status: 200,
    description: "List of movies currently playing retrieved successfully",
    type: MovieResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getNowPlayingMovies(
    @Query("page") page: string = "1",
    @Query("limit") limit?: number,
    @Query("filters") filters?: string,
  ): Promise<MovieResponse> {
    const filterParams: Record<string, string> = filters ? JSON.parse(filters) : {};
    return this.tmdbService.getNowPlayingMovies(page, limit, filterParams);
  }

  @Get("/upcoming")
  @ApiOperation({ summary: "Retrieve a list of upcoming movies" })
  @ApiResponse({
    status: 200,
    description: "List of upcoming movies retrieved successfully",
    type: MovieResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getUpcomingMovies(
    @Query("page") page: string = "1",
    @Query("limit") limit?: number,
    @Query("filters") filters?: string,
  ): Promise<MovieResponse> {
    const filterParams: Record<string, string> = filters ? JSON.parse(filters) : {};
    return this.tmdbService.getUpcomingMovies(page, limit, filterParams);
  }

  @Get("/top_rated")
  @ApiOperation({ summary: "Retrieve a list of top-rated movies" })
  @ApiResponse({
    status: 200,
    description: "List of top-rated movies retrieved successfully",
    type: MovieResponse,
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getTopRatedMovies(
    @Query("page") page: string = "1",
    @Query("limit") limit?: number,
    @Query("filters") filters?: string,
  ): Promise<MovieResponse> {
    const filterParams: Record<string, string> = filters ? JSON.parse(filters) : {};
    return this.tmdbService.getTopRatedMovies(page, limit, filterParams);
  }

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
  public async getGenres(@Query("filters") filters?: string): Promise<GenreResponse> {
    const filterParams: Record<string, string> = filters ? JSON.parse(filters) : {};
    return this.tmdbService.getGenres(filterParams);
  }
}
