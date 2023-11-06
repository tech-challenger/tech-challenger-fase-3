// import { Customer } from '../../model/customer';
// import { CustomerService } from '.';
// import { CustomerRepository } from 'src/domain/repository/customer';
// import { CustomerRepositoryMock } from 'src/infra/datastore/mock/customer';

// describe('CustomerService', () => {
//   let customerService: CustomerService;
//   let customerRepository: CustomerRepository;

//   beforeEach(() => {
//     customerRepository = new CustomerRepositoryMock;
//     customerService = new CustomerService(customerRepository);
//   });

//   describe('create', () => {
//     it('should create a customer with a valid CPF', async () => {
//       const validCustomer: Customer = {
//         id: '1',
//         name: 'John Doe',
//         cpf: '12345678900', // Valid CPF
//       };

//       const createdCustomer = await customerService.create(validCustomer);

//       expect(createdCustomer).toEqual(validCustomer);
//     });

//     it('should throw an error for an invalid CPF', async () => {
//       const invalidCustomer: Customer = {
//         id: '2',
//         name: 'Jane Doe',
//         cpf: '12345678901', // Invalid CPF
//       };

//       await expect(customerService.create(invalidCustomer)).rejects.toThrowError('Invalid CPF');
//     });
//   });

// });