import { registerEnumType } from '@nestjs/graphql';

export enum BiType {
  // 文章
  'ARTICLE' = 'ARTICLE',
  // 标签
  'TAG' = 'TAG',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BiType {
  export function getText(key: BiType) {
    const obj = {
      ARTICLE: '文章',
      TAG: '标签',
    };
    return obj[key];
  }
}

registerEnumType(BiType, {
  name: 'BiTypeEnum',
  description: 'ARTICLE: 文章, TAG: 标签',
  valuesMap: {
    ARTICLE: {
      description: '文章',
    },
    TAG: {
      description: '标签',
    },
  },
});
