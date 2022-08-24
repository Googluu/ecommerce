/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsPhoneNumber, ValidateNested } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Skills {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;


  @ValidateNested()
  @Type(() => Skills)
  readonly skills: Skills[];

  // @IsNotEmpty()
  // @IsArray()
  // readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
