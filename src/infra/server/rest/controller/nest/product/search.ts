import { Controller, Logger, Get, Query } from '@nestjs/common';
import { ProductQuery } from '../../../model/request/product';
import { Page } from '../../../../../../domain/common/page';
import { ProductService } from 'src/domain/service/product';
import { Product } from 'src/domain/model/product';
import { ProductFilter } from 'src/domain/repository/product/filter';
import { ProductResponse } from 'src/infra/server/rest/model/response/product';

@Controller('/product')
export class ProductSearchController {
  private readonly logger = new Logger(ProductSearchController.name);

  constructor(private readonly productService: ProductService) {}

  @Get()
  async search(@Query() query: ProductQuery) {
    const filter = query.toFilter();
    const productPage = await this.productService.search(filter);
    return this.convertToResponse(productPage, filter);
  }

  private convertToResponse(productPage: Page<Product>, filter: ProductFilter) {
    const products = productPage.items.map((product) =>
    ProductResponse.fromDomain(product),
    );

    return new Page(products, filter, productPage.result.total);
  }
}
