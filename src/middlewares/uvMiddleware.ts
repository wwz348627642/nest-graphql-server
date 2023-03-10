import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Response } from 'express';
import { BiService } from 'src/bi/bi.service';
import { RoleEnum } from 'src/user/enums/role.enum';
import { IRequestUserInfo } from './userRole';
@Injectable()
export class UvMiddleware
  implements NestMiddleware<IRequestUserInfo, Response>
{
  constructor(
    private biService: BiService,
  ) {}
  async use(request: IRequestUserInfo, response: Response, next) {
    const isNotAdmin = request?.user?.role != RoleEnum.ADMIN;

    // 获取全局配置的时候，记录一次uv()
    const resolveMethods: string[] = ['querySetting'];
    const body = request.body;
    let isQueryByResolveMethods: boolean;
    if (Array.isArray(body)) {
      isQueryByResolveMethods = body.some(queryRequest => resolveMethods.indexOf(queryRequest?.operationName) > -1);
    }
    
    if (isNotAdmin && isQueryByResolveMethods) {
      const requestRealIp = request.headers['x-real-ip'];
      const x_real_ip = Array.isArray(requestRealIp) ? requestRealIp[0] : requestRealIp;
      const ip: string = process.env.NODE_ENV === 'development' ? '0.0.0.0' : x_real_ip;
      try {
        await this.biService.addUv(ip);
      } catch (e) {
        const error = new ApolloError(e.message);
        throw new UnauthorizedException(error);
      }
    }
    next();
  }
}
  