import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/dto/response/user.response';
import { RoleEnum } from 'src/user/enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    const user: User = ctx.req.user;
    return user?.role === RoleEnum.ADMIN;
  }
}
