import { Module } from '@nestjs/common';
import { OrderCreateController } from '../../../../../../../../infra/server/rest/controller/nest/order/create';
import { OrderServiceModule } from '../../../../../domain/service/order/index';
import { OrderSearchController } from '../../../../../../../../infra/server/rest/controller/nest/order/search';
import { OrderUpdateController } from '../../../../../../../../infra/server/rest/controller/nest/order/update';
import { OrderConfirmController } from '../../../../../../../../infra/server/rest/controller/nest/order/confirm';

@Module({
  imports: [OrderServiceModule],
  controllers: [
    OrderCreateController,
    OrderSearchController,
    OrderUpdateController,
    OrderUpdateController,
    OrderConfirmController,
  ],
  providers: [],
})
export class OrderControllerModule {}
