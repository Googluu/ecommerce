import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    const orders = await this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    const order = this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
  // remover un producto individualmente de la array de products
  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productIds: string[]) {
    const order = await this.orderModel.findById(id);
    // productIds.forEach((pId) => order.products.push(pId));
    if (order) {
      productIds.forEach((elemento) => {
        order.products.addToSet(elemento);
      });
      return order.save();
    }
  }
}
