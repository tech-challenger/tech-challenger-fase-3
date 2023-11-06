import { Module } from '@nestjs/common';
import { OrderControllerModule } from '../../controllers/nest/order/index';
import { ProductControllerModule } from '../../controllers/nest/product';
import { CustomerControllerModule } from '../../controllers/nest/customer';

@Module({
  imports: [OrderControllerModule, ProductControllerModule, CustomerControllerModule],
})
export class APIModule {}
