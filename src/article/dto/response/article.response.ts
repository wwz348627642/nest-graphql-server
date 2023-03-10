import { Field, ObjectType, FieldMiddleware, Int } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ArticleEnum } from 'src/article/enums/article.enum';
import { Pagination } from 'src/common/pagination.response';
import { ObjectIdScalar } from 'src/scalars';
import { Tag } from 'src/tag/dto/response/tag.response';

const ArticleStatusTransfer: FieldMiddleware<Article> = (ctx) => {
  const { source } = ctx;
  const status = source.status;
  if (status) {
    return ArticleEnum.getText(status);
  }
  return null;
};

@ObjectType()
export class Article {
  @Field(() => ObjectIdScalar)
  readonly id?: ObjectId;

  @Field({ description: '标题' })
  title: string;

  @Field({ description: '描述' })
  description: string;

  @Field({ description: '内容' })
  content: string;

  @Field(() => Date, { description: '首次发布时间', nullable: true })
  createTime?: Date;

  @Field(() => Date, { description: '更新时间', nullable: true })
  updateTime?: Date;

  @Field(() => ArticleEnum, {
    description: '当前文章状态',
  })
  status?: ArticleEnum;

  @Field({ middleware: [ArticleStatusTransfer] })
  statusText?: string;

  @Field(() => [Tag], { nullable: true })
  tagList?: Tag[];

  @Field(() => Int, { description: '观看人数' })
  viewCount: number;
}

@ObjectType()
export class ArticleList extends Pagination(Article) {}
