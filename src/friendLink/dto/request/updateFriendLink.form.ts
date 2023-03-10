import { InputType, Field, PartialType } from '@nestjs/graphql';
import { AddFriendLinkForm } from './addFriendLink.form';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateFriendLinkForm extends PartialType(AddFriendLinkForm) {
  @Field()
  @IsNotEmpty()
  id: string;
}
