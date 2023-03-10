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
import { ArticleResolver } from '../article/article.resolver';
import { BiType } from 'src/bi/enums/biType.enum';

type TQueryArticleItemArgs = {
  id: string;
}
// 绝了，没找到apolloRequest定义
interface IGqlRequestBody<T = any> {
  operationName: string;
  variables: T;
  query: string;
}

@Injectable()
export class PvMiddleware
  implements NestMiddleware<IRequestUserInfo, Response>
{
  constructor(
    private biService: BiService,
  ) {}
  async use(request: IRequestUserInfo, response: Response, next) {
    const isNotAdmin = request?.user?.role != RoleEnum.ADMIN;
    // 获取文章，记录一次pv(除了管理员外)
    const resolveMethods: string[] = ['queryArticleItem'];
    const body = request.body;
    let targetRequest: IGqlRequestBody<TQueryArticleItemArgs>;
    if (Array.isArray(body)) {
      targetRequest = body.find(queryRequest => resolveMethods.indexOf(queryRequest?.operationName) > -1);
    }
    if (isNotAdmin && !!targetRequest) {
      const requestRealIp = request.headers['x-real-ip'];
      const x_real_ip = Array.isArray(requestRealIp) ? requestRealIp[0] : requestRealIp;
      const ip: string = process.env.NODE_ENV === 'development' ? '0.0.0.0' : x_real_ip;
      const linkId = targetRequest.variables.id;
      try {
        await this.biService.addPv({
          ip,
          linkId,
          type: BiType.ARTICLE,
        });
      } catch (e) {
        const error = new ApolloError(e.message);
        throw new UnauthorizedException(error);
      }
    }
    next();
  }
}
  