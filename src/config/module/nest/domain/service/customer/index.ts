import { Module } from '@nestjs/common';
import { CustomerRepositoryModule } from '../../repository/customer';
import { CustomerService } from 'src/domain/service/customer';

@Module({
  imports: [CustomerRepositoryModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerServiceModule {}
