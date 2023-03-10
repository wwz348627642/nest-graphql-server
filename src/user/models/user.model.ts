import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleEnum } from '../enums/role.enum';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel extends Document {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop()
  lastLoginTime: Date;

  @Prop({ default: RoleEnum.CUSTOMER })
  role: RoleEnum;

  @Prop()
  nickName: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
