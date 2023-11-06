import { Query } from './query';
import { Product } from '../../../../../domain/model/product';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductFilter } from 'src/domain/repository/product/filter';

export class ProductRequest {
  @ApiProperty()
  @IsString()
  name: string;

  toDomain() {
    return new Product(null, this.name);
  }
}

export class ProductQuery extends Query {
  constructor(readonly name: string, offset: number, limit: number) {
    super(offset, limit);
  }

  toFilter() {
    return new ProductFilter(this.name);
  }
}
