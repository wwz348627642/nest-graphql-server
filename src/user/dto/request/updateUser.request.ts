import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserForm {

  @Field({ description: '昵称' })
  @IsNotEmpty()
  nickName: string;
}
