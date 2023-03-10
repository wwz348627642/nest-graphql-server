import { Field, InputType } from '@nestjs/graphql';
import { DateForm } from 'src/common/dateForm.request';
import { IsNotEmpty, IsIn } from 'class-validator';

@InputType()
export class AddFriendLinkForm {

  @Field({ description: '友情链接名称' })
  name: string;

  @Field({ description: '友情链接url', nullable: true })
  link?: string;
}
