import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { Pagination } from 'src/common/pagination.response';
import { ObjectIdScalar } from 'src/scalars';

@ObjectType()
export class Tag {
  @Field(() => ObjectIdScalar)
  readonly id?: ObjectId;

  @Field({ description: '名称' })
  name: string;

  @Field({ description: '颜色' })
  color: string;
}

@ObjectType()
export class TagList extends Pagination(Tag) {}
