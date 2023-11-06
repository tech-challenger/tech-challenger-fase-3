import {
    BadRequestException,
    Body,
    Controller,
    HttpStatus,
    Logger,
    Post,
    Res,
  } from '@nestjs/common';
 
  import { Product } from 'src/domain/model/product';
  import { ProductService } from '../../../../../../domain/service/product/index';  
  import { ProductRequest } from 'src/infra/server/rest/model/request/product'; 


  @Controller('/product')
  export class ProductCreateController {
    private readonly logger = new Logger(ProductCreateController.name);
  
    constructor(private readonly productService: ProductService) {}
  
    @Post()
    async create(@Body() dto: ProductRequest, @Res() res) {
      let product: Product;

      try {
        product = dto.toDomain();
      } catch (error) {
        throw new BadRequestException(error.message);
      }
  
      const createdId = await this.productService.create(product);
  
      this.logger.log(`The Product with id ${createdId} was created`);
  
      res
        .status(HttpStatus.CREATED)
        .location('/order/' + createdId)
        .json(createdId);
    }
  }
  