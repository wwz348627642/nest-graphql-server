import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { BiService } from './bi.service';
import { PvForm } from './dto/request/pv.request';
import { Uv } from './dto/response/uv.response';
import * as moment from 'moment';
import { UvForm } from './dto/request/uv.request';
import { Pv } from './dto/response/pv.response';
import { Article } from 'src/article/dto/response/article.response';
import { ArticleService } from 'src/article/article.service';

@UseGuards(AdminGuard)
@Resolver(() => Uv)
export class UvResolver {
  constructor(private biService: BiService) {}

  @Query(() => [Uv], {
    description: '按时间统计uv',
  })
  async uvBi(@Args('uvForm') uvForm: UvForm) {
    const { startDate, endDate } = uvForm;
    interface IPvData {
      [date: string]: number;
    }
    try {
      const data = await this.biService.uvByDate(uvForm);
      const objDate = data.reduce((prev, next) => {
        prev[next.date] = next.count;
        return prev;
      }, {} as IPvData);
      const diff = moment(endDate).diff(startDate, 'day');
      const arr: Uv[] = Array.from({ length: diff + 1 }).map((_, index) => {
        const date = moment(startDate).add(index, 'day').format('YYYY-MM-DD');
        return {
          date,
          count: objDate[date] ? objDate[date] : 0,
        };
      });
      return arr;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }
}

@UseGuards(AdminGuard)
@Resolver(() => Pv)
export class PvResolver {
  constructor(
    private biService: BiService,
    private articleService: ArticleService,
  ) {}
  @Query(() => [Pv], {
    description: '按时间统计pv'
  })
  async pvBi(@Args('pvForm') pvForm: PvForm ) {
    try {
      const list = await this.biService.pvByDate(pvForm);
      return list;
    } catch(e) {
      return new ApolloError(e.message)
    }
  }

  @ResolveField('article', () => Article)
  async getArticle (
    @Parent() pv: { _id: string, sum: number }
  ) {
    const { _id } = pv;
    const article = this.articleService.queryItemById(_id);
    return article;
  }
}

