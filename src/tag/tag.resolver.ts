import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateTagForm } from './dto/request/create.request';
import { Tag } from './dto/response/tag.response';
import { TagService } from './tag.service';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query(() => [Tag], {
    description: '获取标签列表',
  })
  async tagList() {
    try {
      const data = await this.tagService.list();
      return data;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Tag, {
    description: '添加标签',
  })
  async createTag(@Args('createForm') createForm: CreateTagForm) {
    try {
      return await this.tagService.create(createForm);
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Boolean, {
    description: '删除标签',
  })
  async deleteArticleById(@Args('id') id: string) {
    try {
      await this.tagService.deleteById(id);
      return true;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }
}
