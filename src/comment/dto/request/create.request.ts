import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentForm {

  @Field()
  @IsNotEmpty()
  articleId: string;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field({ nullable: true })
  replyId?: string;
}
