import { Filter } from '../../../domain/repository/filter';

export interface CRUD<T> {
  find(filter: Filter): Promise<T[]>;

  insertOne(document): Promise<string>;

  findById(id: string): Promise<T>;

  update(id: string, document): Promise<boolean>;

  deleteOne(id: string): Promise<boolean>;

  count(filter: Filter): Promise<number>;
}
