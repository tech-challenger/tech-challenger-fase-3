import { Order } from 'src/domain/model/order';
import { MongoCRUD } from '../../../../util/lib/mongodb/mongo-crud';
import converter from './converter';
import { Injectable } from '@nestjs/common';
import { MongoDriver } from '../../../../config/mongodb/driver';
import { OrderQueue } from '../../../../domain/queue/order/index';

const COLLECTION = 'order_queues';

@Injectable()
export class OrderMongoQueue implements OrderQueue {
  private readonly crud: MongoCRUD<Order>;

  constructor(db: MongoDriver) {
    this.crud = new MongoCRUD(db.collection(COLLECTION), converter);
  }

  push(order: Order) {
    return this.crud.insertOne(order);
  }
}
