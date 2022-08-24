/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested, // validar en cascada si tenemos una clase tambien la va a validar como parte de ella
  IsMongoId,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateCategoryDto } from './category.dtos';
import { CreateSubDocDto } from './sub-doc.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly category: CreateCategoryDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;

  //
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto; // 1:1

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]; // 1:N
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
