import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './interfaces/movie.interface';
import { MongoGenericRepository } from './mongoRepository';

@Injectable()
export class MongoDataServices implements OnApplicationBootstrap {
  movies: MongoGenericRepository<Movie>;

  constructor(@InjectModel('Movie') private MoviewRepository: Model<Movie>) {}

  onApplicationBootstrap() {
    this.movies = new MongoGenericRepository<Movie>(this.MoviewRepository);
  }
}
