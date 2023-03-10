import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = CommentModel & Document;

@Schema()
export class CommentModel extends Document {

  @Prop()
  articleId: string

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop()
  updateTime: Date;

  @Prop()
  userId: string;

  @Prop({ default: null })
  pid: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);

CommentSchema.pre('findByIdAndUpdate', function (next) {
  this.findByIdAndUpdate({}, { updateTime: Date.now() });
  next();
});
