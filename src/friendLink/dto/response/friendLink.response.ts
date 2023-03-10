import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from 'src/scalars';

@ObjectType()
export class FriendLink {

  @Field(() => ObjectIdScalar)
  readonly id?: ObjectId;

  @Field()
  name: string;

  @Field({ nullable: true })
  link?: string;

  @Field(() => Date)
  createTime: Date;

  @Field(() => Date, { nullable: true })
  updateTime?: Date;
}
