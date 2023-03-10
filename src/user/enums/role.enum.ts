import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  // 管理员
  'ADMIN' = 'ADMIN',
  // 游客
  'CUSTOMER' = 'CUSTOMER',
  // 访客
  'VISITOR' = 'VISITOR',
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
  valuesMap: {
    ADMIN: {
      description: '管理员',
    },
    CUSTOMER: {
      description: '游客',
    },
    VISITOR: {
      description: '访客',
    },
  },
});
