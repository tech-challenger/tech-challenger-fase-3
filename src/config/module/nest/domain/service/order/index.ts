import { Module } from '@nestjs/common';
import { OrderRepositoryModule } from '../../repository/order';
import { OrderService } from 'src/domain/service/order';
import { OrderQueueModule } from '../../queue/order';

@Module({
  imports: [OrderRepositoryModule, OrderQueueModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderServiceModule {}
