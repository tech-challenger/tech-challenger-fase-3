import { Product } from 'src/domain/model/product';
import { MongoCRUD } from '../../../../util/lib/mongodb/mongo-crud';
import converter from './converter';
import { Injectable } from '@nestjs/common';
import { MongoDriver } from '../../../../config/mongodb/driver';
import { ProductQueue } from '../../../../domain/queue/Product/index';

const COLLECTION = 'product_queues';

@Injectable()
export class ProductMongoQueue implements ProductQueue {
  private readonly crud: MongoCRUD<Product>;

  constructor(db: MongoDriver) {
    this.crud = new MongoCRUD(db.collection(COLLECTION), converter);
  }

  push(product: Product) {
    return this.crud.insertOne(product);
  }
}
