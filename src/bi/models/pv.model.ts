import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BiType } from '../enums/biType.enum';

export type PvDocument = PvModel & Document;

@Schema()
export class PvModel extends Document {
  @Prop()
  ip: string;

  @Prop({ default: 1 })
  count: number;

  @Prop()
  linkId: string;

  @Prop()
  type: BiType;

  @Prop({ default: Date.now })
  date: Date;
}

export const PvSchema = SchemaFactory.createForClass(PvModel);
