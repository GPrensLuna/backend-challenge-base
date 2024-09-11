/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import type { MovieResponse, GenreResponse } from "./dto/tmdb.dto";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TmdbService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  public constructor(private readonly configService: ConfigService) {
    const apiUrl = this.configService.get<string>("API_TMDB_URL");
    const apiKey = this.configService.get<string>("TOKEN_ACCESS_API");

    if (!apiUrl) {
      throw new HttpException("API_TMDB_URL is not defined", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!apiKey) {
      throw new HttpException("TOKEN_ACCESS_API is not defined", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  //******************************************************************* */
  // TODO: getPopularMovies
  public async getPopularMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/popular");
  }

  //******************************************************************* */
  // TODO: getNowPlayingMovies
  public async getNowPlayingMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/now_playing");
  }

  //******************************************************************* */
  // TODO: getUpcomingMovies
  public async getUpcomingMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/upcoming");
  }

  //******************************************************************* */
  // TODO: getTopRatedMovies
  public async getTopRatedMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/top_rated");
  }

  //******************************************************************* */
  // TODO: getGenres
  public async getGenres(): Promise<GenreResponse> {
    return this.fetchData<GenreResponse>("/genre/movie/list");
  }

  //******************************************************************* */
  // TODO: private fetchData
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.apiUrl}${endpoint}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      if (!response.ok) {
        throw new HttpException("Invalid data format", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const data: unknown = await response.json();

      if (this.isValidResponse<T>(data)) {
        return data;
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
    if (typeof data === "object" && data !== null) {
      return true;
    }
    return false;
  }
}
