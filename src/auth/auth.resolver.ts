import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { AuthService } from './auth.service';
import { LoginForm } from './dto/request/login.request';
import { RegisterForm } from './dto/request/register.request';

@Resolver('Auth')
// @UseGuards(AuthGuard)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Boolean, {
    description: '注册',
  })
  async register(@Args('registerForm') registerForm: RegisterForm) {
    try {
      await this.authService.register(registerForm);
      return true;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @Mutation(() => String, {
    description: '登录',
  })
  async login(@Args('loginForm') loginForm: LoginForm) {
    return await this.authService.login(loginForm);
  }
}
