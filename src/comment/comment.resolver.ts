import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { LoginUser } from 'src/decorators/LoginUser';
import { AdminGuard } from 'src/guards/admin.guard';
import { LoginGuard } from 'src/guards/login.guard';
import { User } from 'src/user/dto/response/user.response';
import { UserService } from 'src/user/user.service';
import { CommentService } from './comment.service';
import { CreateCommentForm } from './dto/request/create.request';
import { UpdateCommentForm } from './dto/request/update.request';
import { Comment } from './dto/response/comment.response';
import { CommentModel } from './models/comment.model';


@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  @Query(() => [Comment], {
    description: '获取评论列表',
  })
  async commentList(@Args('articleId') articleId: string) {
    try {
      return await this.commentService.queryCommentByArticleId(articleId)
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @ResolveField('user', () => User)
  async getUserInfo (
    @Parent() commnet: Omit<Comment, 'user'> & Pick<CommentModel, 'userId'>,
  ) {
    const { userId } = commnet;
    const userInfo = await this.userService.findById(userId);
    return userInfo;
  }

  // TODO 只能本人 or 管理员
  @Mutation(() => Comment, {
    description: '修改评论',
  })
  async updateComment(@Args('updateCommentForm') updateCommentForm: UpdateCommentForm ) {
    try {
      return await this.commentService.updateComment(updateCommentForm)
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(LoginGuard)
  @Mutation(() => Comment, {
    description: '新增评论',
  })
  async addComment(
    @Args('createCommentForm') createCommentForm: CreateCommentForm,
    @LoginUser() user: User,
  ) {
    try {
      return await this.commentService.createComment({
        ...createCommentForm,
        userId: user?.id.toString(),
      })
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Boolean, {
    description: '删除评论',
  })
  async deleteComment(@Args('id') id: string) {
    try {
      await this.commentService.deleteComment(id);
      return true
    } catch (e) {
      return new ApolloError(e.message);
    }
  }
}