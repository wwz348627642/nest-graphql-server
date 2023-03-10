import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUser } from 'src/decorators/LoginUser';
import { User } from '../user/dto/response/user.response';
import { SettingService } from './setting.service';
import { ApolloError } from 'apollo-server-express';
import { Setting } from './dto/response/setting.response';
import { SettingForm } from './dto/request/setting.request';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Resolver('Setting')
export class SettingResolver {
  constructor(
    private settingService: SettingService,
  ) {}

  @Query(() => Setting, {
    description: '查询当前管理员设置',
  })
  async querySetting() {
    try {
      return await this.settingService.querySetting();
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => String)
  async setSetting (@Args('settingForm') settingForm: SettingForm) {
    try {
      const id = await this.settingService.setSetting(settingForm);
      return id
    } catch (e) {
      return new ApolloError(e.message);
    }
  }
}
