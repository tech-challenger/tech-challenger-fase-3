import { Module } from '@nestjs/common';
import { CustomerRepository } from '../../../../../../domain/repository/customer';
import { CustomerRepositoryMock } from '../../../../../../infra/datastore/mock/customer/index';
import { MongoDriver } from '../../../../../mongodb/driver';
import { CustomerMongoRepository } from 'src/infra/datastore/mongo/customer';

function getuseClass() {
  switch (process.env.DOMAIN_REPOSITORY_ORDER_DATASTORE) {
    case 'mongo':
      return CustomerMongoRepository;
    default:
      return CustomerRepositoryMock;
  }
}

const provider = {
  provide: CustomerRepository,
  useClass: getuseClass(),
};

@Module({
  imports: [],
  providers: [provider, MongoDriver],
  exports: [provider],
})
export class CustomerRepositoryModule {}
