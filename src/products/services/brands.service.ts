/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandSchema: Model<Brand>,
  ) {}

  async findAll() {
    const brands = await this.brandSchema.find().exec();
    return brands;
  }

  async findOne(id: string) {
    const brand = await this.brandSchema.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = new this.brandSchema(data);
    return newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandSchema
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }

  async remove(id: string) {
    return await this.brandSchema.findByIdAndDelete(id);
  }
}
