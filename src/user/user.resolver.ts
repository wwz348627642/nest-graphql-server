import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUser } from 'src/decorators/LoginUser';
import { User } from './dto/response/user.response';
import { UserService } from './user.service';
import { ApolloError } from 'apollo-server-express';
import { UpdateUserForm } from './dto/request/updateUser.request';
import { UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/guards/login.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => User, {
    description: '根据token查询用户',
  })
  async findUserByToken(@LoginUser() user: User) {
    if (user) {
      return user;
    } else {
      return new ApolloError('未查询到当前用户');
    }
  }

  @UseGuards(LoginGuard)
  @Mutation(() => User, {
    description: '更新用户信息'
  })
  async updateUser(
    @LoginUser() user: User,
    @Args('updateUserForm') updateUserForm: UpdateUserForm
  ) {
    try {
      return await this.userService.updateUserById({
        ...updateUserForm,
        id: user.id.toString(),
      })
    } catch (e) {
      return new ApolloError(e.message);
    }
  }
}
