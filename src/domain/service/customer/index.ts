import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../../model/customer';
import { CustomerRepository } from '../../repository/customer/index';
import { CustomerFilter } from '../../repository/customer/filter';
import { Page } from '../../common/page';
import * as log from '../../../util/log';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class CustomerService {
    private readonly logger = log.fromContext(CustomerService.name);

    constructor(@Inject(CustomerRepository) private readonly repository: CustomerRepository) { }

    async create(customer: Customer) {

        const isCPFValid = cpf.isValid(customer.cpf); // Validate CPF
        if (!isCPFValid) {
            throw new Error('Invalid CPF');
        }

        const createdCustomer = await this.repository.create(customer);
        this.logger.info(`The customer with id ${createdCustomer} was created`);
        return createdCustomer;
    }

    async update(customer: Customer) {
        const existingCustomer = await this.repository.findById(customer.id);
        if (!existingCustomer) {
            throw new Error(`Customer ${customer.id} not found`);
        }

        const isCPFValid = cpf.isValid(customer.cpf); // Validate CPF
        if (!isCPFValid) {
            throw new Error('Invalid CPF');
        }

        await this.repository.update(existingCustomer);
        this.logger.info(`The customer with id ${customer.id} was updated`);
    }

    async findById(customerId: string) {
        return this.repository.findById(customerId);
    }

    async search(filter: CustomerFilter) {
        const [total, customers] = await this.findWithTotal(filter);
        return new Page(customers, filter, total);
    }

    private findWithTotal(filter: CustomerFilter) {
        return Promise.all([
            this.repository.count(filter),
            this.repository.find(filter),
        ]);
    }
}