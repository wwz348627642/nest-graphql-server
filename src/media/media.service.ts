import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MediaCreateForm } from './dto/request/media.createForm';
import { MediaDocument } from './models/media.model';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel('MediaModel') private mediaModel: Model<MediaDocument>,
  ) {}
    
  async create(mediaCreateForm: MediaCreateForm) {
    const createdMedia = new this.mediaModel(mediaCreateForm);
    return await createdMedia.save();
  }

  async list() {
    return await this.mediaModel.find();
  }

  async deleteMedia(id: string) {
    return await this.mediaModel.findByIdAndDelete(id);
  }
}