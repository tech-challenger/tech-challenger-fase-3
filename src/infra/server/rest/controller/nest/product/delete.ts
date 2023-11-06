import { Controller, Logger, Get, Query, Delete, Param } from '@nestjs/common';
import { Product } from 'src/domain/model/product';
import { ProductService } from 'src/domain/service/product';



@Controller('/product')
export class ProductDeleteController {
  private readonly logger = new Logger(ProductDeleteController.name);

  constructor(private readonly productService: ProductService) {}

  @Delete(':id')
  async delete(@Param('id') id: Product) {
    await this.productService.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
