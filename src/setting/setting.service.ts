import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingForm } from './dto/request/setting.request';
import { SettingDocument } from './models/setting.model';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel('SettingModel') private settingModel: Model<SettingDocument>,
  ) {}

  async querySetting () {
    const setting = await this.settingModel.findOne();
    return setting || {};
  }

  async setSetting (settingForm: SettingForm) {
    const { id, live2dName, openLive2d } = settingForm;
    // add
    if (!id) {
      const newSetting = new this.settingModel(settingForm);
      const newData = await newSetting.save();
      return newData.id;
    }
    // update
    const data = await this.settingModel.findByIdAndUpdate(id, {
      openLive2d,
      live2dName
    })
    return data.id;
  }

}