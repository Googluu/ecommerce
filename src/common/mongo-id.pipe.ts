/* eslint-disable prettier/prettier */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator'; //cunado la inicial esta en minuscula es porque es una funcion

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`${value} not is a mongoId`);
    }
    return value;
  }
}
