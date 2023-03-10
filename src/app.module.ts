import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ArticleModule } from './article/article.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserRoleMiddleware } from './middlewares/userRole';
import { TagModule } from './tag/tag.module';
import { BiModule } from './bi/bi.module';
import { UvMiddleware } from './middlewares/uvMiddleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SettingModule } from './setting/setting.module';
import { FriendLinkModule } from './friendLink/friendLink.module';
import { CommentModule } from './comment/comment.module';
import config from './config/index';
import { PvMiddleware } from './middlewares/pvMiddleware';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [config],
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      mocks: false,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      csrfPrevention: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('mongodb'),
      inject: [ConfigService],
    }),
    ArticleModule,
    UserModule,
    AuthModule,
    TagModule,
    BiModule,
    SettingModule,
    FriendLinkModule,
    CommentModule,
    MediaModule,
  ],
  exports: [AuthModule, UserModule, BiModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserRoleMiddleware, UvMiddleware, PvMiddleware).forRoutes('*');
  }
}
