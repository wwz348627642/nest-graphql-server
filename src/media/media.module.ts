import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';;
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';
import { MediaModel, MediaSchema } from './models/media.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MediaModel.name, schema: MediaSchema },
    ]),
  ],
  providers: [MediaResolver, MediaService],
  exports: [MediaService],
})
export class MediaModule {}
