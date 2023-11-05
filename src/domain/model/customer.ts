import { AssertionConcern } from '../common/assertion-concern';

export class Customer extends AssertionConcern<Customer> {
  private readonly customerId: string;
  private readonly customerName: string;
  private readonly customerCpf: string;

  constructor(_id: string, name: string, cpf: string) {
    super();
    this.customerId = _id;
    this.customerName = name;
    this.customerCpf = cpf;
  }

  get id() {
    return this.customerId;
  }

  get name() {
    return this.customerName;
  }

  get cpf() {
    return this.customerName;
  }

}