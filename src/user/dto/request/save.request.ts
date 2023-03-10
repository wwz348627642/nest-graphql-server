import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional } from 'class-validator';
import { RegisterForm } from 'src/auth/dto/request/register.request';
import { RoleEnum } from 'src/user/enums/role.enum';

@InputType()
export class SaveForm extends RegisterForm {
  @Field(() => RoleEnum, { nullable: true })
  @IsOptional()
  @IsIn([RoleEnum.ADMIN, RoleEnum.CUSTOMER, RoleEnum.VISITOR], {
    message: '权限设置异常',
  })
  role?: RoleEnum;
}
