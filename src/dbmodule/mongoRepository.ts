import { Model } from 'mongoose';
import { IGenericRepository } from './IgenericRepo';
import { IPaginate } from './interfaces/IPaginationPayload.interface';

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
  async paginate(payload: IPaginate): Promise<any> {
    let options = {};
    if (payload.search && payload.search.length) {
      options = {
        $or: [...payload.search],
      };
    }
    const query = this._repository.find(options);
    if (payload.sort) {
      query.sort(payload.sort);
    }
    const page: number = parseInt(payload.pageNumber as any) || 1;
    const limit = 10;
    return new Promise(async (resolve, reject) => {
      try {
        const total = await this._repository.count(options);
        const data = await query
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
        resolve({
          data,
          total,
          page,
          last_page: Math.ceil(total / limit),
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }
}
