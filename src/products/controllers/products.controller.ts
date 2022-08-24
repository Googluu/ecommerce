/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dtos';

import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
