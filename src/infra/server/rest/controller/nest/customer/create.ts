import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Customer } from 'src/domain/model/customer';
import { CustomerService } from '../../../../../../domain/service/customer/index';
import { CustomerRequest } from '../../../model/request/customer';

@Controller()
export class CustomerCreateController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/customer')
  async create(@Body() dto: CustomerRequest, @Res() res) {
    let customer: Customer;

    try {
      customer = dto.toDomain();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const createdCustomer = await this.customerService.create(customer);

    res
      .status(HttpStatus.CREATED)
      .location('/customer/' + createdCustomer)
      .json(createdCustomer);
  }
}