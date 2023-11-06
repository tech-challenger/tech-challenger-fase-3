import { Collection, Document } from 'mongodb';
import { CRUD } from '../../../infra/datastore/common/crud';
import { Filter } from '../../../domain/repository/filter';
import converter, { Converter } from './converter';

const maxQueryTimeout = 100;
export class MongoCRUD<T> implements CRUD<T> {
  constructor(
    readonly collection: Promise<Collection<Document>>,
    private converter: Converter,
  ) {}

  async find(filter: Filter): Promise<T[]> {
    const orders = await (await this.collection)
      .find(converter.filter(filter.query), { maxTimeMS: maxQueryTimeout })
      .skip(filter.offset)
      .limit(filter.limit)
      .toArray();
    return orders.map((a) => this.converter.from(a));
  }

  async insertOne(object: T) {
    const result = await (
      await this.collection
    ).insertOne(this.converter.to(object));
    return result.insertedId.toHexString();
  }

  async findById(id: string): Promise<T> {
    const order = await (
      await this.collection
    ).findOne({ _id: converter._id(id) });

    if (!order) return;
    return this.converter.from(order);
  }

  async update(id: string, object: T) {
    const result = await (
      await this.collection
    ).replaceOne({ _id: converter._id(id) }, this.converter.to(object));
    return result.modifiedCount > 0;
  }

  async deleteOne(id: string) {
    const result = await (
      await this.collection
    ).deleteOne({ _id: converter._id(id) });
    return result.deletedCount > 0;
  }

  async count(filter: Filter) {
    return (await this.collection).countDocuments(
      converter.filter(filter.query),
    );
  }
}
