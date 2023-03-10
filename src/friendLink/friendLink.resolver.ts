import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { AddFriendLinkForm } from './dto/request/addFriendLink.form';
import { UpdateFriendLinkForm } from './dto/request/updateFriendLink.form';
import { FriendLink } from './dto/response/friendLink.response';
import { FriendLinkService } from './friendLink.service';

@Resolver('Uv')
export class FriendLinkResolver {
  constructor(private friendLinkService: FriendLinkService) {}

  @Query(() => [FriendLink], {
    description: '查询友情链接',
  })
  async queryFriendLink() {
    try {
      return await this.friendLinkService.queryFriendLink();
    } catch (e) {
      return new ApolloError(e.message);
    }
   
  }

  @UseGuards(AdminGuard)
  @Mutation(() => FriendLink, {
    description: '添加友情链接'
  })
  async addFriendLink (
    @Args('addForm') addFriendLinkForm: AddFriendLinkForm
  ) {
    try {
      const data = await this.friendLinkService.addFriendLink(addFriendLinkForm);
      return data;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => FriendLink, {
    description: '更新友情链接'
  })
  async updateFriendLink(
    @Args('updateForm') updateFriendLinkForm: UpdateFriendLinkForm,
  ) {
    try {
      const data = await this.friendLinkService.updateFriendLink(updateFriendLinkForm);
      return data;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

   
  @UseGuards(AdminGuard)
  @Mutation(() => Boolean, {
    description: '删除友情链接'
  })
  async deleteFriendLink(
    @Args('id') id: string
  ) {
    try {
      await this.friendLinkService.deleteFriendLink(id);
      return true;
    } catch (e) {
      return new ApolloError(e.message);
    }
  } 

}