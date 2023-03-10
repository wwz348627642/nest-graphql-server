import { registerEnumType } from '@nestjs/graphql';

export enum ArticleEnum {
  // 已发布
  'SUCCESS' = 'SUCCESS',
  // 已下线
  'DOWN' = 'DOWN',
  // 存草稿
  'PENDING' = 'PENDING',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ArticleEnum {
  export function getText(key: ArticleEnum) {
    const obj = {
      SUCCESS: '已发布',
      DOWN: '已下线',
      PENDING: '草稿',
    };
    return obj[key];
  }
}

registerEnumType(ArticleEnum, {
  name: 'ArticleEnum',
  description: 'SUCCESS: 已发布, DOWN: 已下线, PENDING: 存草稿',
  valuesMap: {
    SUCCESS: {
      description: '已发布',
    },
    DOWN: {
      description: '已下线',
    },
    PENDING: {
      description: '存草稿',
    },
  },
});
