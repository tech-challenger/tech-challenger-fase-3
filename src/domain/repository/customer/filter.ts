import { Filter } from '../filter';

export class CustomerFilter extends Filter {
  constructor(
    status: string,
    id: string,
    name: string,
    cpf: string,
    customerId: string,
    offset?: number,
    limit?: number,
  ) {
    super({ status, id, customerId , name , cpf}, offset, limit);
  }
}
