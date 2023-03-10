import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ListForm } from './dto/request/list.request';
import { CreateForm } from './dto/request/create.request';
import { ArticleList, Article } from './dto/response/article.response';
import { ArticleService } from './article.service';
import { UpdateForm } from './dto/request/update.request';
import { ApolloError } from 'apollo-server-express';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/dto/response/user.response';
import { LoginUser } from 'src/decorators/LoginUser';
import { AdminGuard } from 'src/guards/admin.guard';
import { RoleEnum } from 'src/user/enums/role.enum';
import { ArticleEnum } from './enums/article.enum';
import { Tag } from 'src/tag/dto/response/tag.response';
import { TagService } from 'src/tag/tag.service';
import { ArticleModel } from './models/article.model';
import { BiService } from 'src/bi/bi.service';

@Resolver(() => ArticleList)
export class ArticleListResolver {
  constructor(
    private articleService: ArticleService,
  ) {}

  @Query(() => ArticleList, {
    description: '获取文章列表',
  })
  async articleList(
    @Args('listForm') listForm: ListForm,
    @LoginUser() user: User
  ) {
    if (user?.role != RoleEnum.ADMIN) {
      listForm.status = ArticleEnum.SUCCESS;
    }
    return listForm
  }

  @ResolveField('content', () => [Article])
  async getContent(@Parent() listForm: ListForm,) {
    try {
      return await this.articleService.list(listForm);
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @ResolveField('total', () => Int, {
    description: '文章总数',
  })
  async total(@Parent() listForm: ListForm) {
    try {
      return await this.articleService.count(listForm);
    } catch (e) {
      return new ApolloError(e.message);
    }
  }
}

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private articleService: ArticleService,
    private tagService: TagService,
    private biService: BiService,
  ) {}

  @Query(() => Article, {
    description: '获取单个文章',
  })
  async queryArticleItem(@Args('id') id: string) {
    try {
      const data = await this.articleService.queryItemById(id);
      return data;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Article, {
    description: '新增文章',
  })
  async createArticle(@Args('createForm') createForm: CreateForm) {
    try {
      return await this.articleService.create(createForm);
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Article, {
    description: '修改文章',
  })
  async modifyArticleById(@Args('updateForm') updateForm: UpdateForm) {
    try {
      return await this.articleService.update(updateForm);
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Boolean, {
    description: '删除文章',
  })
  async deleteArticleById(@Args('id') id: string) {
    try {
      await this.articleService.deleteById(id);
      return true;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @ResolveField('tagList', () => [Tag])
  async getTagList(
    @Parent() article: Omit<Article, 'tagList'> & Pick<ArticleModel, 'tagList'>,
  ) {
    const { tagList } = article;
    if (!tagList || !tagList.length) {
      return [];
    }
    try {
      return await this.tagService.findByIds(tagList);
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @ResolveField('viewCount', () => Int)
  async getViewCount (
    @Parent() article: Article,
  ) {
    const { id } = article;
    const idStr = id.toString();
    const pvpvBylinkIdResult = await this.biService.pvBylinkId(idStr);
    return pvpvBylinkIdResult?.sum || 0;
  }
}