import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
