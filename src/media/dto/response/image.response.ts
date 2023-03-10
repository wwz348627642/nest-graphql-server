import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from 'src/scalars';

@ObjectType()
export class Image {

  @Field(() => ObjectIdScalar)
  readonly id?: ObjectId;

  @Field()
  url: string;

  @Field(() => Date)
  createTime: Date;

  @Field({ nullable: true })
  description?: string;
}
