import { Filter } from '../repository/filter';
type Result = {
  limit: number;
  offset: number;
  total: number;
};

export class Page<T> {
  readonly result: Result;
  constructor(readonly items: T[], filter: Filter, total = 0) {
    this.result = {
      offset: filter.offset,
      limit: filter.limit,
      total,
    };
  }
}
