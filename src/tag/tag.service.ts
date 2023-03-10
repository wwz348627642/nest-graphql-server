import { Injectable } from '@nestjs/common';
// import { ListForm } from './dto/request/list.request';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TagDocument } from './models/tag.model';
import { CreateTagForm } from './dto/request/create.request';
// import { UpdateForm } from './dto/request/update.request';
import * as DataLoader from 'dataloader';

@Injectable()
export class TagService {
  constructor(@InjectModel('TagModel') private tagModel: Model<TagDocument>) {}

  dataLoader = new DataLoader(async (ids: string[]) => {
    return await this.tagModel.find({ _id: { $in: ids } });
  });

  async create(createForm: CreateTagForm) {
    const createdArticle = new this.tagModel(createForm);
    return await createdArticle.save();
  }

  async list() {
    return await this.tagModel.find();
  }

  async findById(id: string) {
    return await this.dataLoader.load(id);
  }

  async findByIds(ids: string[]) {
    return await this.tagModel.find({ _id: { $in: ids } })
  }

  async deleteById(id: string) {
    return await this.tagModel.findByIdAndDelete(id);
  }
}
