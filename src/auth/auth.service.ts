import { Injectable } from '@nestjs/common';
import { LoginForm } from './dto/request/login.request';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { RegisterForm } from './dto/request/register.request';
import { ApolloError } from 'apollo-server-express';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async register(registerForm: RegisterForm) {
    const { name } = registerForm;
    const oldUser = await this.userService.findByName(name);
    if (oldUser) {
      throw new ApolloError('账号已注册');
    }

    return await this.userService.saveUser(registerForm);
  }

  async login(loginForm: LoginForm) {
    const user = await this.userService.findByPassword(loginForm);
    const lastLoginTime = moment().toISOString();
    await this.userService.updateUserById({
      id: user.id,
      nickName: user.nickName,
      lastLoginTime,
    })
    if (!user) {
      throw new ApolloError('账号或密码错误!');
    }
   
    const token = this.jwtService.sign(loginForm);
    return token;
  }

  async validate(token: string) {
    const jwtConfig: JwtModuleOptions = this.configService.get('jwt');
    return await this.jwtService.verify<LoginForm>(token, {
      secret: jwtConfig.secret,
    });
  }
}
