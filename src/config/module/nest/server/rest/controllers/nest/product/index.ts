import { Module } from '@nestjs/common';
import { ProductCreateController } from 'src/infra/server/rest/controller/nest/product/create';
import { ProductServiceModule } from 'src/config/module/nest/domain/service/product';
import { ProductSearchController } from 'src/infra/server/rest/controller/nest/product/search';
import { ProductDeleteController } from 'src/infra/server/rest/controller/nest/product/delete';




@Module({
  imports: [ProductServiceModule],
  controllers: [ProductCreateController,ProductSearchController, ProductDeleteController],
  providers: [],
})
export class ProductControllerModule {}
