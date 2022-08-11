/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product-entity';

@Injectable()
export class ProductsService {
  private counterId = 1; // the autoincrementador id
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price:  123,
      stock: 2,
      image: 'http://www.example.com/image.jpg',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return  this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
