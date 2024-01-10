import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IItem } from './item.interface';

export type ItemDocument = HydratedDocument<IItem>;

@Schema({ timestamps: true })
export class Item {
  @Prop({ type: String, default: null })
  icon: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  thumbnail: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({
    type: [
      {
        user: String,
        rate: Number,
      },
    ],
    default: [],
  })
  rating: {
    user: string;
    rate: number;
  }[];

  @Prop({
    type: [
      {
        user: String,
        comment: Number,
      },
    ],
    default: [],
  })
  comment: {
    user: string;
    comment: string;
  };

  @Prop({ type: String, required: true }) // ref Category
  category: string;

  @Prop({ type: String, required: true, enum: ['GAMES', 'APPS'] })
  type: 'GAMES' | 'APPS';

  @Prop({ type: [String], required: true })
  usedTechnologies: string[];

  @Prop({ type: String, required: true })
  repoURL: string;

  @Prop({ type: String, required: true })
  demoURL: string;

  @Prop({ type: String, required: true }) // ref User
  developer: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
