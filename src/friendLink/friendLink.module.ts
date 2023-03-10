import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendLinkResolver } from './friendLink.resolver';
import { FriendLinkService } from './friendLink.service';
import { FriendLinkModel, FriendLinkSchema } from './models/friendLink.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendLinkModel.name, schema: FriendLinkSchema },
    ]),
  ],
  providers: [FriendLinkResolver, FriendLinkService],
})
export class FriendLinkModule {}
