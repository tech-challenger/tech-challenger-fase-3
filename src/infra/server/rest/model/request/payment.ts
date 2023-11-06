import { Payment } from 'src/domain/model/payment';
import { PaymentMethod } from '../../../../../domain/model/payment-method';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentRequest {
  @ApiProperty()
  @IsString()
  name: PaymentMethod;

  toDomain() {
    return new Payment(null, this.name);
  }
}
