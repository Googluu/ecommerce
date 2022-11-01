/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
