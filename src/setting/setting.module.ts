import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingModel, SettingSchema } from './models/setting.model';
import { SettingResolver } from './setting.resolver';
import { SettingService } from './setting.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SettingModel.name, schema: SettingSchema }]),
  ],
  providers: [SettingResolver, SettingService],
})
export class SettingModule {}
