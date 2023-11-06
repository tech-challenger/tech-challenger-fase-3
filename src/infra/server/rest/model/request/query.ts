export abstract class Query {
  constructor(readonly offset: number, readonly limit: number) {}
}
