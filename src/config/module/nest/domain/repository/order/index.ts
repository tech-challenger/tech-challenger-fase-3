import { Module } from '@nestjs/common';
import { OrderRepository } from '../../../../../../domain/repository/order';
import { OrderMongoRepository } from '../../../../../../infra/datastore/mongo/order/index';
import { OrderRepositoryMock } from '../../../../../../infra/datastore/mock/order/index';
import { MongoDriver } from '../../../../../mongodb/driver';

function getuseClass() {
  switch (process.env.DOMAIN_REPOSITORY_ORDER_DATASTORE) {
    case 'mongo':
      return OrderMongoRepository;
    default:
      return OrderRepositoryMock;
  }
}

const provider = {
  provide: OrderRepository,
  useClass: getuseClass(),
};

@Module({
  imports: [],
  providers: [provider, MongoDriver],
  exports: [provider],
})
export class OrderRepositoryModule {}
