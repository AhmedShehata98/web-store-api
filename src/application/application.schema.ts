import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IApplication } from './application.interface';
import { Category } from 'src/category/category.schema';
import { User } from 'src/users/user.schema';
import { Review } from 'src/review/review.schema';

export type ApplicationDocument = HydratedDocument<IApplication>;

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: String, required: true, trim: true })
  shortId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, default: null })
  description: string;

  @Prop({ type: String })
  thumbnail: string;

  @Prop({
    type: [
      {
        url: String,
        width: Number,
        height: Number,
      },
    ],
    default: [],
  })
  images: {
    url: string;
    width: number;
    height: number;
  }[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', default: [] }])
  review: Review;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  developer: User;

  @Prop({ type: String, required: true })
  demoUrl: string;

  @Prop({ type: String, required: true })
  repoUrl: string;

  @Prop({ type: Array<String>, required: true })
  usedTechnologies: Array<string>;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
