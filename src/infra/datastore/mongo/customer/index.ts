import { Customer } from 'src/domain/model/customer';
import { CustomerRepository } from 'src/domain/repository/customer';
import { CustomerFilter } from 'src/domain/repository/customer/filter';
import { MongoCRUD } from '../../../../util/lib/mongodb/mongo-crud';
import { Injectable } from '@nestjs/common';
import { MongoDriver } from '../../../../config/mongodb/driver';
import converter from 'src/infra/queue/mongo/order/converter';

const COLLECTION = 'customers';

@Injectable()
export class CustomerMongoRepository implements CustomerRepository {
  private readonly crud: MongoCRUD<Customer>;

  constructor(db: MongoDriver) {
    this.crud = new MongoCRUD(db.collection(COLLECTION), converter );
  }

  findById(orderId: string) {
    return this.crud.findById(orderId);
  }

  count(filter: CustomerFilter) {
    return this.crud.count(filter);
  }

  find(filter: CustomerFilter) {
    return this.crud.find(filter);
  }

  create(customer: Customer) {
    return this.crud.insertOne(customer);
  }

  update(customer: Customer) {
    return this.crud.update(customer.id, customer);
  }
}
