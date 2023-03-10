import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateForm } from './create.request';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateForm extends PartialType(CreateForm) {
  @Field()
  @IsNotEmpty()
  id: string;
}
