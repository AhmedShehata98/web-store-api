import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser } from 'src/users/user.interface';
import { User } from 'src/users/user.schema';
import { IReview } from './review.interface';
import { Application } from 'src/application/application.schema';

export type ReviewDocument = HydratedDocument<IReview>;

@Schema({ timestamps: true })
export class Review {
  @Prop({
    ref: User.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  user: IUser;

  @Prop({ type: Number, required: true })
  rate: number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Application' })
  // applicationId: Application;
  @Prop({ type: String, ref: 'Application' })
  applicationShortId: string;

  @Prop({ type: String, required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
