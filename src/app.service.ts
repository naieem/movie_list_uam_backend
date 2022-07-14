import { BadRequestException, Injectable } from '@nestjs/common';
import { Movie } from './dbmodule/interfaces/movie.interface';
import { MongoDataServices } from './dbmodule/mongodataService.service';

@Injectable()
export class AppService {
  constructor(private mongoDataService: MongoDataServices) {}
  getHello(): string {
    return 'Hello World!';
  }
  async insertMovies(movie: Movie): Promise<Movie> {
    return new Promise(async (resolve, reject) => {
      try {
        const movieResponse = await this.mongoDataService.movies.upsert(movie, {
          imdbID: movie.imdbID,
        });
        resolve(movieResponse);
      } catch (error) {
        reject(new BadRequestException(error));
      }
    });
  }
}
