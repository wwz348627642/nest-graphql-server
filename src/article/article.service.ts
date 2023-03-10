import { Injectable } from '@nestjs/common';
import { ListForm } from './dto/request/list.request';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument, ArticleModel } from './models/article.model';
import { CreateForm } from './dto/request/create.request';
import { UpdateForm } from './dto/request/update.request';
import * as DataLoader from 'dataloader';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('ArticleModel') private articleModel: Model<ArticleDocument>,
  ) {}

  dataLoader = new DataLoader(async (ids: string[]) => {
    return await this.articleModel.find({ _id: { $in: ids } });
  });

  async create(createForm: CreateForm) {
    const createdArticle = new this.articleModel(createForm);
    return await createdArticle.save();
  }

  async update(updateForm: UpdateForm) {
    const { title, tagList, content, description, status } = updateForm;
    this.dataLoader.clear(updateForm.id);
    return await this.articleModel.findByIdAndUpdate(updateForm.id, {
      title,
      tagList,
      content,
      description,
      status,
    }, { new: true });
  }

  async deleteById(id: string) {
    this.dataLoader.clear(id);
    return await this.articleModel.findByIdAndDelete(id);
  }

  async queryItemById(id: string) {
    return await this.dataLoader.load(id);
  }

  async list(form: ListForm) {
    const { pageNo, pageSize, status, tagId } = form;
    const articleArgs: any = {};
    if (status) {
      articleArgs.status = status;
    }
    if (tagId) {
      articleArgs.tagList = { $in: tagId.split(',') }
    }
    const content = await this.articleModel
      .find(articleArgs)
      .limit(pageSize)
      .skip((pageNo - 1) * pageSize)
      .sort({ createTime: -1 })
      .exec();
    return content;
  }

  async count(form: ListForm) {
    const { status, tagId } = form;
    const articleArgs: any = {};
    if (status) {
      articleArgs.status = status;
    }
    if (tagId) {
      articleArgs.tagList = { $in: tagId.split(',') }
    }
    const total = await this.articleModel.find(articleArgs).count();
    return total;
  }
}
