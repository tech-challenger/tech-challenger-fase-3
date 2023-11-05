import { Customer } from '../../../../../domain/model/customer';

export class CustomerResponse {
  constructor(readonly name: string) {}

  static fromDomain(customer: Customer) {
    return new CustomerResponse(customer.name);
  }
}
