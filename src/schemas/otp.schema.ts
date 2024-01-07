import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type otpDocument = HydratedDocument<IOtp>;

@Schema()
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
  accountId: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ default: Date.now(), expires: 60 * 10 })
  createdAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(Otp);
