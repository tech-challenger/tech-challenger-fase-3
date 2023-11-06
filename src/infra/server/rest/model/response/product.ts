import { Product } from '../../../../../domain/model/product';

export class ProductResponse {
  constructor(readonly name: string) {}

  static fromDomain(product: Product) {
    return new ProductResponse(product.name);
  }
}
