import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTagForm {
  @Field({ description: '标签名称' })
  @IsNotEmpty()
  name: string;

  @Field({ description: '标签颜色' })
  @IsNotEmpty()
  color: string;
}
