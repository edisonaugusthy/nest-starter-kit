import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema({ collection: 'Users', _id: false, timestamps: true, autoIndex: true })
export class UserModel {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'User' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
