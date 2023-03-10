import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCommentForm {

  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  content: string;
}
