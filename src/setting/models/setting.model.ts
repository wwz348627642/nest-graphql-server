import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = SettingModel & Document;

@Schema()
export class SettingModel extends Document {
  @Prop({ default: false })
  openLive2d: boolean;

  @Prop()
  live2dName: string;
}

export const SettingSchema = SchemaFactory.createForClass(SettingModel);
