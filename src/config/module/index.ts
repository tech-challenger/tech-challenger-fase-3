import { APIModule } from './nest/server/rest/api/nest';
import { Module } from '@nestjs/common';
import { OrderServiceModule } from './nest/domain/service/order';
import { ProductServiceModule } from './nest/domain/service/product';
import { CustomerServiceModule } from './nest/domain/service/customer';
@Module({
  imports: [APIModule, OrderServiceModule , ProductServiceModule, CustomerServiceModule],
})
export class AppModule {}
