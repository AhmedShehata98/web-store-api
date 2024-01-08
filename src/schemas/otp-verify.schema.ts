import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpVerificationDocument =
  HydratedDocument<IOtpVerificationDocument>;

@Schema()
export class OtpVerification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  email: string;

  @Prop({ expires: 3600 })
  expires: Date;
}

export const OtpVerificationSchema =
  SchemaFactory.createForClass(OtpVerification);
