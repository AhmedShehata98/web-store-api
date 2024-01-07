import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<IUser>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  profileImageUrl: string | null;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  userFramework: string;

  @Prop({ default: null, unique: true })
  githubProfileUrl: string | null;

  @Prop({ default: null, unique: true })
  linkedinProfileUrl: string | null;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
