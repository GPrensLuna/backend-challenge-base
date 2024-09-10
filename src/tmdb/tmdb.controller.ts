import { TmdbService } from "./tmdb.service";
import { Controller, Get } from "@nestjs/common";
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
    type: [MovieResponse],
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getPopularMovies(): Promise<MovieResponse> {
    return this.tmdbService.getPopularMovies();
  }

  @Get("/now_playing")
  @ApiOperation({ summary: "Retrieve a list of movies currently playing in theaters" })
  @ApiResponse({
    status: 200,
    description: "List of movies currently playing retrieved successfully",
    type: [MovieResponse],
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getNowPlayingMovies(): Promise<MovieResponse> {
    return this.tmdbService.getNowPlayingMovies();
  }

  @Get("/upcoming")
  @ApiOperation({ summary: "Retrieve a list of upcoming movies" })
  @ApiResponse({
    status: 200,
    description: "List of upcoming movies retrieved successfully",
    type: [MovieResponse],
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getUpcomingMovies(): Promise<MovieResponse> {
    return this.tmdbService.getUpcomingMovies();
  }

  @Get("/top_rated")
  @ApiOperation({ summary: "Retrieve a list of top-rated movies" })
  @ApiResponse({
    status: 200,
    description: "List of top-rated movies retrieved successfully",
    type: [MovieResponse],
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getTopRatedMovies(): Promise<MovieResponse> {
    return this.tmdbService.getTopRatedMovies();
  }

  @Get("/genres")
  @ApiOperation({ summary: "Retrieve a list of movie genres" })
  @ApiResponse({
    status: 200,
    description: "List of genres retrieved successfully",
    type: [GenreResponse],
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  public async getGenres(): Promise<GenreResponse> {
    return this.tmdbService.getGenres();
  }
}
