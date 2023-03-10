import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from 'src/tag/tag.module';
import { ArticleResolver, ArticleListResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { ArticleSchema, ArticleModel } from './models/article.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArticleModel.name, schema: ArticleSchema },
    ]),
    forwardRef(() => TagModule),
  ],
  providers: [ArticleService, ArticleResolver, ArticleListResolver],
  exports: [ArticleService]
})
export class ArticleModule {}
