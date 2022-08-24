/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 }) // indexacion compuesta
