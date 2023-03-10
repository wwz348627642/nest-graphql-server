import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentModel, CommentSchema } from './models/comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
