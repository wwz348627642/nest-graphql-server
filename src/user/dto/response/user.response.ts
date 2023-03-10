import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ObjectIdScalar } from 'src/scalars';
import { RoleEnum } from 'src/user/enums/role.enum';

@ObjectType()
export class User {
  @Field(() => ObjectIdScalar)
  readonly id?: ObjectId;

  @Field({ description: '账号' })
  name: string;

  @Field(() => Date, { description: '创建时间', nullable: true })
  createTime?: Date;

  @Field(() => Date, { description: '上次登录时间', nullable: true })
  lastLoginTime?: Date;

  @Field(() => RoleEnum, { description: '当前文章状态' })
  role?: RoleEnum;

  @Field({ description: '昵称' })
  nickName: string;
}
