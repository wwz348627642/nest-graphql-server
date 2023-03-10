import { InputType, Field } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ArticleEnum } from 'src/article/enums/article.enum';

@InputType()
export class CreateForm {
  @Field({ description: '文章标题' })
  @IsNotEmpty()
  title: string;

  @Field({ description: '文章描述' })
  @IsNotEmpty()
  description: string;

  @Field({ description: '文章内容' })
  @IsNotEmpty()
  content: string;

  @Field(() => ArticleEnum, { description: '文章跟新状态', nullable: true })
  @IsOptional()
  @IsIn([ArticleEnum.DOWN, ArticleEnum.PENDING, ArticleEnum.SUCCESS])
  status?: ArticleEnum;

  @Field(() => [String], { description: '标签id', nullable: true })
  tagList?: string[];
}
