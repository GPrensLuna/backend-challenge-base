import { ApiProperty } from "@nestjs/swagger";

export class Movie {
  @ApiProperty()
  public id: number = 0;

  @ApiProperty()
  public title: string = "";

  @ApiProperty()
  public overview: string = "";

  @ApiProperty()
  public release_date: string = "";

  @ApiProperty()
  public poster_path: string = "";

  @ApiProperty()
  public backdrop_path: string = "";

  @ApiProperty()
  public genre_ids: number[] = [];

  @ApiProperty()
  public original_language: string = "";

  @ApiProperty()
  public original_title: string = "";

  @ApiProperty()
  public popularity: number = 0;

  @ApiProperty()
  public vote_average: number = 0;

  @ApiProperty()
  public vote_count: number = 0;

  @ApiProperty()
  public adult: boolean = false;

  @ApiProperty()
  public video: boolean = false;
}

export class MovieResponse {
  @ApiProperty({ type: [Movie] })
  public results: Movie[] = [];

  @ApiProperty()
  public page?: number = 1;

  @ApiProperty()
  public search?: string = "";

  @ApiProperty()
  public withGenres?: number = 1;

  @ApiProperty()
  public total_results?: number = 0;

  @ApiProperty()
  public total_pages?: number = 0;
}

export class Genre {
  @ApiProperty()
  public id: number = 0;

  @ApiProperty()
  public name: string = "";
}

export class GenreResponse {
  @ApiProperty({ type: [Genre] })
  public genres: Genre[] = [];
}
