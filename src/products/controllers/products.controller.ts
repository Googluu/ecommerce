/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseInitPipe } from '../../common/parse-init.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List products' })
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // @Post()
  // create(@Body() payload: CreateProductDto) {
  //   return this.productsService.create(payload);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
  //   return this.productsService.update(+id, payload);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
