import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SettingForm {
  @Field({ nullable: true })
  id?: string;

  @Field({ description: '是否开启live2d' })
  @IsNotEmpty()
  openLive2d: boolean;

  @Field({ description: 'live2d模型名称', nullable: true })
  live2dName?: string;
}
