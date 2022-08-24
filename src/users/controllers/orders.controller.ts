import {
  Controller,
  Get,
  Param,
  Body,
  Put,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  addProductsToOrderDto,
} from '../dtos/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(id, payload);
  }

  @Put(':id/products')
  updateProduct(
    @Param('id') id: string,
    @Body() payload: addProductsToOrderDto,
  ) {
    return this.orderService.addProducts(id, payload.productsIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/product/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.orderService.removeProduct(id, productId);
  }
}
