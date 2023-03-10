import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';
import { TagSchema, TagModel } from './models/tag.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TagModel.name, schema: TagSchema }]),
  ],
  exports: [TagService],
  providers: [TagService, TagResolver],
})
export class TagModule {}
