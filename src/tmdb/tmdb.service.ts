import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { MovieResponse, GenreResponse, MovieDetailResponse } from "./dto/tmdb.dto";

@Injectable()
export class TmdbService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  public constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>("API_TMDB_URL")!;
    this.apiKey = this.configService.get<string>("TOKEN_ACCESS_API")!;

    if (!this.apiUrl) {
      throw new HttpException("API_TMDB_URL is not defined", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!this.apiKey) {
      throw new HttpException("TOKEN_ACCESS_API is not defined", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getMovies(
    type: "popular" | "now_playing" | "upcoming" | "top_rated",
    page: string = "1",
    query?: string,
    withGenres?: string,
  ): Promise<MovieResponse> {
    const endpoint = query ? "/search/movie" : `/movie/${type}`;
    const params: Record<string, string> = {
      page,
    };

    if (query) params.query = query;
    if (withGenres) params.with_genres = withGenres;

    return this.fetchData<MovieResponse>(endpoint, params);
  }

  public async getMoviesByGenre(
    type: "popular" | "now_playing" | "upcoming" | "top_rated",
    genreId: string,
    page: string = "1",
  ): Promise<MovieResponse> {
    const endpoint = `/discover/movie`;
    const params: Record<string, string> = {
      page,
      with_genres: genreId,
    };

    return this.fetchData<MovieResponse>(endpoint, params);
  }

  public async getGenres(): Promise<GenreResponse> {
    return this.fetchData<GenreResponse>("/genre/movie/list");
  }

  public async getMovieDetails(movieId: string): Promise<MovieDetailResponse> {
    return this.fetchData<MovieDetailResponse>(`/movie/${movieId}`);
  }

  private async fetchData<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    try {
      const queryString = params ? new URLSearchParams(params).toString() : "";
      const url = `${this.apiUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new HttpException(
          errorMessage || "Invalid data format",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const data = await response.json();
      if (this.isValidResponse<T>(data)) {
        return data as T;
      } else {
        throw new HttpException("Invalid data format", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException("Error fetching data", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  private isValidResponse<T>(data: unknown): data is T {
    return typeof data === "object" && data !== null;
  }
}
