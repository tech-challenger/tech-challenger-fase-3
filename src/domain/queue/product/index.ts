import { Product } from '../../model/product';

export interface ProductQueue {
  push(product: Product): Promise<string>;
}

export const ProductQueue = Symbol('ProductQueue');
