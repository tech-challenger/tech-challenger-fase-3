import { Filter } from '../filter';

export class OrderFilter extends Filter {
  constructor(
    status: string,
    id: string,
    customerId: string,
    offset?: number,
    limit?: number,
  ) {
    super({ status, id, customerId }, offset, limit);
  }
}
