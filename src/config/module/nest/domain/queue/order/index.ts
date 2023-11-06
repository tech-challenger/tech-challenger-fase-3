import { Module } from '@nestjs/common';
import { OrderQueue } from '../../../../../../domain/queue/order';
import { OrderMongoQueue } from '../../../../../../infra/queue/mongo/order/index';
import { OrderMockQueue } from '../../../../../../infra/queue/mock/order/index';
import { MongoDriver } from '../../../../../mongodb/driver';

function getuseClass() {
  switch (process.env.DOMAIN_REPOSITORY_ORDER_QUEUE) {
    case 'mongo':
      return OrderMongoQueue;
    default:
      return OrderMockQueue;
  }
}

const provider = {
  provide: OrderQueue,
  useClass: getuseClass(),
};

@Module({
  imports: [],
  providers: [provider, MongoDriver],
  exports: [provider],
})
export class OrderQueueModule {}
