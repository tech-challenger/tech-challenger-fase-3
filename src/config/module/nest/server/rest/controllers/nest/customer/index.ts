import { Module } from '@nestjs/common';
import { CustomerServiceModule } from 'src/config/module/nest/domain/service/customer';
import { CustomerCreateController } from 'src/infra/server/rest/controller/nest/customer/create';


@Module({
  imports: [CustomerServiceModule],
  controllers: [CustomerCreateController],
  providers: [],
})
export class CustomerControllerModule {}