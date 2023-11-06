import { Customer } from 'src/domain/model/customer';
import { CustomerRepository } from 'src/domain/repository/customer';
import { CustomerFilter } from 'src/domain/repository/customer/filter';

const mockedOrders = [
  new Customer('133', 'teste1', '14875648752'  ),
  new Customer('133', 'teste2', '14225387523'  ),
  new Customer('133', 'teste3', '33875648743'  )
];

export class CustomerRepositoryMock implements CustomerRepository {

  findById(CustomerId: string): Promise<Customer> {
    console.log('CustomerRepositoryMock::count', CustomerId);
    return Promise.resolve(mockedOrders[0]);
  }
  count(filter: CustomerFilter): Promise<number> {
    console.log('CustomerRepositoryMock::count', filter);
    return Promise.resolve(10);
  }

  find(filter: CustomerFilter): Promise<Customer[]> {
    console.log('CustomerRepositoryMock::find', filter);
    return Promise.resolve(mockedOrders);
  }

  create(customer: Customer): Promise<string> {
    console.log('CustomerRepositoryMock::create', customer);
    return Promise.resolve('12345');
  }

  update(customer: Customer): Promise<boolean> {
    console.log('CustomerRepositoryMock::update', customer);
    return Promise.resolve(true);
  }


}
