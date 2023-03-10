import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDateString } from 'class-validator';

@InputType()
export class DateForm {
  @Field({ description: '开始时间' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Field({ description: '结束时间' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
