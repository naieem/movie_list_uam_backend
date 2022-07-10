import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ErrorException } from './utils/error.interception';

@Controller('movies')
export class MoviesController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async insertMovies() {
    try {
      const movie = await this.appService.insertMovies({
        title: 'test',
        type: 'sdfds',
        year: '333',
        poster: 'dfd',
        imdbId: '',
      });
      return { result: movie };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
