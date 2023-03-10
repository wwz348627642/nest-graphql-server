import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = TagModel & Document;

@Schema()
export class TagModel extends Document {
  @Prop()
  name: string;

  @Prop()
  color: string;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop()
  updateTime: Date;
}

export const TagSchema = SchemaFactory.createForClass(TagModel);

TagSchema.pre('findByIdAndUpdate', function (next) {
  this.findByIdAndUpdate({}, { updateTime: Date.now() });
  next();
});
