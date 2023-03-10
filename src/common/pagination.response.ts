import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPagination<T> {
  pageNo: number;
  pageSize: number;
  total: number;
  content: T[];
}

export function Pagination<T>(classRef: Type<T>): Type<IPagination<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginationResponse<T> implements IPagination<T> {
    @Field(() => Int)
    pageNo: number;

    @Field(() => Int)
    pageSize: number;

    @Field(() => Int)
    total: number;

    @Field(() => [classRef], { nullable: true })
    content: T[];
  }

  return PaginationResponse as Type<IPagination<T>>;
}
