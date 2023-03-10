import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class MediaCreateForm {
  @Field({ description: '链接地址' })
  @IsNotEmpty()
  url: string;

  @Field({ description: '描述', nullable: true })
  description?: string;
}
