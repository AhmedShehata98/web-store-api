import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ICategory } from './category.interface';

export type CategoryDocument = HydratedDocument<ICategory>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true, unique: true, trim: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true, trim: true })
  shortId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
