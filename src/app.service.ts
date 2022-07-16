import { BadRequestException, Injectable } from '@nestjs/common';
import { IPaginate } from './dbmodule/interfaces/IPaginationPayload.interface';
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
  async movieList(pagination: IPaginate | any): Promise<Movie[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let searChArr = [];
        const acceptedSortProperty = ['Title', 'Year'];
        const acceptedValue = ['asc', 'desc'];
        if (pagination.search) {
          searChArr = [
            { Title: new RegExp(pagination.search, 'i') },
            { Year: new RegExp(pagination.search, 'i') },
            { imdbID: new RegExp(pagination.search, 'i') },
          ];
        }
        if (pagination.sort) {
          for (const key in pagination.sort) {
            if (
              !acceptedSortProperty.includes(key) ||
              !acceptedValue.includes(pagination.sort[key])
            ) {
              throw new BadRequestException(
                'sort property or value not valid.Expected properties are ' +
                  acceptedSortProperty.join(','),
              );
            }
          }
        }
        pagination.search = searChArr;
        const movies = await this.mongoDataService.movies.paginate(pagination);
        resolve(movies);
      } catch (error) {
        reject(error);
      }
    });
  }
}
