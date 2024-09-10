import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import fetch from "node-fetch";
import type { MovieResponse, GenreResponse } from "./dto/tmdb.dto";

@Injectable()
export class TmdbService {
  private readonly apiUrl = process.env.API_TMDB_URL;
  private readonly apiKey = process.env.TOKEN_ACCESS_API;

  public async getPopularMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/popular");
  }

  public async getNowPlayingMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/now_playing");
  }

  public async getUpcomingMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/upcoming");
  }

  public async getTopRatedMovies(): Promise<MovieResponse> {
    return this.fetchData<MovieResponse>("/movie/top_rated");
  }

  public async getGenres(): Promise<GenreResponse> {
    return this.fetchData<GenreResponse>("/genre/movie/list");
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}?api_key=${this.apiKey}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new HttpException("Error communicating with TMDb API", HttpStatus.BAD_GATEWAY);
      }
      const data: unknown = await response.json();

      if (this.isValidResponse<T>(data)) {
        return data;
      } else {
        throw new HttpException("Invalid data format", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      throw new HttpException("Error fetching data", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private isValidMovieResponse(data: unknown): data is MovieResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "results" in data &&
      Array.isArray((data as MovieResponse).results) &&
      "page" in data &&
      "total_results" in data &&
      "total_pages" in data
    );
  }

  private isValidGenreResponse(data: unknown): data is GenreResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "genres" in data &&
      Array.isArray((data as GenreResponse).genres)
    );
  }

  private isValidResponse<T>(data: unknown): data is T {
    if (data && typeof data === "object") {
      if ("results" in data) {
        return this.isValidMovieResponse(data as MovieResponse);
      }
      if ("genres" in data) {
        return this.isValidGenreResponse(data as GenreResponse);
      }
    }
    return false;
  }
}
