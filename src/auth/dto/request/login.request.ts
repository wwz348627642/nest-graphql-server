import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginForm {
  @Field({ description: '登录用户' })
  @IsNotEmpty({ message: '登录用户不能为空' })
  @MinLength(4, { message: '用户名至少为$constraint1位' })
  @MaxLength(20, { message: '用户名最多为$constraint1位' })
  name: string;

  @Field({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码至少为$constraint1位' })
  @MaxLength(16, { message: '密码最多为$constraint1位' })
  password: string;
}
