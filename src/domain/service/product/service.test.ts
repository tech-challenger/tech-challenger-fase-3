// import { Product } from 'src/domain/model/product';
// import { ProductService } from '.';
// import { ProductRepository } from 'src/domain/repository/product';

// describe('ProductService', () => {
//   let productService: ProductService;
//   let productRepository: ProductRepository;

//   beforeEach(() => {
//     productRepository = new ProductRepository();
//     productService = new ProductService(productRepository);
//   });

//   describe('create', () => {
//     it('should create a product', async () => {
//       const product: Product = {
//         id: '1',
//         name: 'Product 1',
//       };

//       const createdProduct = await productService.create(product);

//       expect(createdProduct).toEqual(product);
//     });
//   });

// });