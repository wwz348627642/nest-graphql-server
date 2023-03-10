import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FriendLinkDocument = FriendLinkModel & Document;

@Schema()
export class FriendLinkModel extends Document {

  @Prop()
  name: string;

  @Prop()
  link: string;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop()
  updateTime: Date;
}

export const FriendLinkSchema = SchemaFactory.createForClass(FriendLinkModel);

FriendLinkSchema.pre('findByIdAndUpdate', function (next) {
  this.findByIdAndUpdate({}, { updateTime: Date.now() });
  next();
});
