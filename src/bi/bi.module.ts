import { forwardRef, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PvResolver, UvResolver } from './bi.resolver';
import { BiService } from './bi.service';
import { UvModel, UvSchema } from './models/uv.model';
import { PvModel, PvSchema } from './models/pv.model';
import { ArticleModule } from 'src/article/article.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UvModel.name, schema: UvSchema },
      { name: PvModel.name, schema: PvSchema },
    ]),
    forwardRef(() => ArticleModule),
  ],
  providers: [BiService, PvResolver, UvResolver],
  exports: [BiService],
})
export class BiModule {}
