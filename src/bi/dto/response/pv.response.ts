import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Article } from 'src/article/dto/response/article.response';

@ObjectType()
export class Pv {

  @Field(() => Article)
  article?: Article;

  @Field(() => Int)
  count: number;
}
