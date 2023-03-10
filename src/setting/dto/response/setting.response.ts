import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from 'src/scalars';

@ObjectType()
export class Setting {
  @Field(() => ObjectIdScalar, { nullable: true })
  readonly id?: ObjectId;

  @Field({ description: '是否开启live2d', nullable: true })
  openLive2d?: boolean;

  @Field({ description: '所使用的live2d模型名称', nullable: true })
  live2dName?: string;
}