import { InputType, Field } from '@nestjs/graphql';
import { IsIn, IsOptional } from 'class-validator';
import { ArticleEnum } from 'src/article/enums/article.enum';
import { PaginationForm } from '../../../common/pagination.request';

@InputType()
export class ListForm extends PaginationForm {
  @Field(() => ArticleEnum, {
    description: '文章跟新状态',
    nullable: true,
  })
  @IsOptional()
  @IsIn([ArticleEnum.DOWN, ArticleEnum.PENDING, ArticleEnum.SUCCESS])
  status?: ArticleEnum;

  @Field({ description: '文章标签, 支持,分割', nullable: true })
  tagId?: string;
}
