/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from './brand.entity'; // con la que se va a ser la relacion uno a uno referenciadas

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true }) // con index true ya es una indexacion
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  // esta es una relacion enbebida en mongo
  @Prop(
    raw({
      name: { type: String, },
      image: { type: String, },
    }),
  )
  category: Record<string, any>

  // realcion uno a uno referenciadas de products y brands
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 }) // indexacion compuesta
