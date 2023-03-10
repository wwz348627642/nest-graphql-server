import { Field, InputType } from '@nestjs/graphql';
import { LoginForm } from 'src/auth/dto/request/login.request';

@InputType()
export class RegisterForm extends LoginForm {

  @Field({ description: '昵称' })
  nickName?: string;
}
