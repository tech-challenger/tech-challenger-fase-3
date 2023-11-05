import { Filter } from '../filter';

export class ProductFilter extends Filter {
  constructor(
    readonly name: string,
    offset?: number,
    limit?: number,
  ) {
    super(offset, limit);
  }
}
