import { Field, ObjectType, FieldMiddleware, Int } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from 'src/scalars';
import { User } from 'src/user/dto/response/user.response';

@ObjectType()
export class Comment {
  @Field(() => ObjectIdScalar)
  readonly id?: ObjectId;

  @Field(() => User)
  user: User;

  @Field()
  articleId: string;

  @Field()
  content: string;

  @Field(() => Date)
  createTime: Date;

  @Field(() => Date, { nullable: true })
  updateTime?: Date;

  @Field({ nullable: true })
  pid?: string;
}
