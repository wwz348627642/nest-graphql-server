import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: '分页请求' })
export class PaginationForm {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  @IsOptional()
  @IsInt({ message: '页码必须为正整数' })
  @Min(1, { message: '页码不能小于$constraint1' })
  pageNo = 1;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @IsOptional()
  @IsInt({ message: '分页大小必须为正整数' })
  @Min(1, { message: '分页大小不能小于$constraint1' })
  @Max(100, { message: '分页大小过大，不能超过$constraint1' })
  pageSize = 10;
}
