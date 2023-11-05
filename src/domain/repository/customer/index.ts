import { Customer } from '../../model/Customer';
import { CustomerFilter } from './filter';

export interface CustomerRepository {
  update(Customer: Customer): Promise<boolean>;
  create(Customer: Customer): Promise<string>;
  find(filter: CustomerFilter): Promise<Customer[]>;
  findById(CustomerId: string): Promise<Customer>;
  count(filter: CustomerFilter): Promise<number>;
}

export const CustomerRepository = Symbol('CustomerRepository');
