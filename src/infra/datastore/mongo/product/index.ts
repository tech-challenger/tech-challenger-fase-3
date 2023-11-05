import { Product } from 'src/domain/model/product';
import { MongoCRUD } from '../../../../util/lib/mongodb/mongo-crud';
import converter from '../order/converter';
import { Injectable } from '@nestjs/common';
import { MongoDriver } from '../../../../config/mongodb/driver';
import { ProductRepository } from 'src/domain/repository/product';
import { ProductFilter } from 'src/domain/repository/product/filter';

const COLLECTION = 'product';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  private readonly crud: MongoCRUD<Product>;

  constructor(db: MongoDriver) {
    this.crud = new MongoCRUD(db.collection(COLLECTION), converter);
  }

  findById(productId: string) {
    return this.crud.findById(productId);
  }
  async delete(product: Product){
    await this.crud.deleteOne(product.id)
  }

  count(filter: ProductFilter) {
    return this.crud.count(filter);
  }
  find(filter: ProductFilter) {
    return this.crud.find(filter);
  }

  create(product: Product) {
    return this.crud.insertOne(product);
  }

}
