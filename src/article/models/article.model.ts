import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ArticleEnum } from '../enums/article.enum';

export type ArticleDocument = ArticleModel & Document;

@Schema()
export class ArticleModel extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop()
  updateTime: Date;

  @Prop({ default: ArticleEnum.PENDING })
  status: ArticleEnum;

  @Prop()
  tagList: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleModel);

ArticleSchema.pre('findByIdAndUpdate', function (next) {
  this.findByIdAndUpdate({}, { updateTime: Date.now() });
  next();
});
