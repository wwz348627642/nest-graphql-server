import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddFriendLinkForm } from './dto/request/addFriendLink.form';
import { UpdateFriendLinkForm } from './dto/request/updateFriendLink.form';
import { FriendLinkDocument } from './models/friendLink.model';

@Injectable()
export class FriendLinkService {
  constructor(
    @InjectModel('FriendLinkModel') private friendLinkModel: Model<FriendLinkDocument>,
  ) {}

  async queryFriendLink () {
    return await this.friendLinkModel.find().sort({ createTime: -1 }).exec();
  }

  async addFriendLink (addFriendLinkForm: AddFriendLinkForm) {
    const { name, link } = addFriendLinkForm;
    const newLink = await new this.friendLinkModel({
      name,
      link,
    })
    return await newLink.save();
  }

  async updateFriendLink (updateFriendLinkForm: UpdateFriendLinkForm) {
    const { id, name, link } = updateFriendLinkForm;
    const newData = await this.friendLinkModel.findByIdAndUpdate(id, {
      name,
      link
    }, { new: true })
    return newData;
  }

  async deleteFriendLink(id: string) {
    return await this.friendLinkModel.findByIdAndDelete(id);
  }
}