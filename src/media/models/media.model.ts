import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = MediaModel & Document;

@Schema()
export class MediaModel extends Document {
  @Prop()
  url: string;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop()
  description: string;
}

export const MediaSchema = SchemaFactory.createForClass(MediaModel);
