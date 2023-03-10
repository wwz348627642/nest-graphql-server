import { Field, InputType } from '@nestjs/graphql';
import { DateForm } from 'src/common/dateForm.request';
import { IsNotEmpty, IsIn } from 'class-validator';
import { BiType } from 'src/bi/enums/biType.enum';

@InputType()
export class PvForm extends DateForm {

  @Field(() => BiType)
  @IsNotEmpty()
  @IsIn([BiType.ARTICLE, BiType.TAG])
  type: BiType;
}
