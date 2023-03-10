import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExpressContext } from 'apollo-server-express';
import { IRequestUserInfo } from '../middlewares/userRole';

export const LoginUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context =
      GqlExecutionContext.create(ctx).getContext<ExpressContext>();
    const req = context.req as IRequestUserInfo;
    return req.user ? req.user : null;
  },
);
