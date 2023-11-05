import { Customer } from '../../../../../domain/model/customer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerRequest {
  @ApiProperty()
  @IsString()
  name: string;
  cpf: string;

  toDomain() {
    return new Customer(null, this.name, this.cpf);
  }
}
