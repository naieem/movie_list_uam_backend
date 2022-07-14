import { Model } from 'mongoose';
import { IGenericRepository } from './IgenericRepo';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  get(id: any): Promise<T | any> {
    return this._repository.findById(id).populate(this._populateOnFind).exec();
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }
  upsert(item: T, filter: any): Promise<any> {
    return this._repository.findOneAndUpdate(
      filter,
      { $set: item },
      { upsert: true },
    ) as any;
  }

  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }
}
