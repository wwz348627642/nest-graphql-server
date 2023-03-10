import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/dto/response/user.response';
import { UserService } from 'src/user/user.service';

export interface IRequestUserInfo extends Request {
  user?: User;
}

@Injectable()
export class UserRoleMiddleware
  implements NestMiddleware<IRequestUserInfo, Response>
{
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  async use(request: IRequestUserInfo, response: Response, next) {
    const token = request.get('authorization');
    if (token) {
      try {
        const data = await this.authService.validate(token);
        const user = await this.userService.findByPassword(data);
        if (user) {
          request.user = user;
        }
      } catch (e) {
        const error = new ApolloError(e.message);
        throw new UnauthorizedException(error);
      }
    }
    next();
  }
}
