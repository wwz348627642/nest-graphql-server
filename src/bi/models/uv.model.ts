import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UvDocument = UvModel & Document;

@Schema()
export class UvModel extends Document {
  @Prop()
  ip: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ default: 1 })
  count: number;
}

export const UvSchema = SchemaFactory.createForClass(UvModel);
