import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';
import { IOtp } from './otp.interface';

export type OtpCodeDocument = HydratedDocument<IOtp>;

@Schema({ timestamps: true })
export class OtpCode {
  @Prop({ required: true, unique: true })
  accountId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  otpCode: string;

  @Prop({ type: Date, expires: 3600 })
  expires: string;
}

export const OtpSchema = SchemaFactory.createForClass(OtpCode);
