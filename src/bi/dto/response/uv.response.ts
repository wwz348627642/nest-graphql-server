import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Uv {
  @Field()
  date: string;

  @Field(() => Int)
  count: number;
}
