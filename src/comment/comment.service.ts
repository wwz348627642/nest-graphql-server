import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, CommentModel } from './models/comment.model';
import { CreateCommentForm } from './dto/request/create.request';
import { UpdateCommentForm } from './dto/request/update.request';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('CommentModel') private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(createCommentForm: CreateCommentForm & { userId: string }) {
    const { articleId, content, replyId: pid, userId } = createCommentForm;
    const createdComment = new this.commentModel({
      articleId,
      content,
      userId,
      pid
    });
    return await createdComment.save();
  }

  async updateComment(updateCommentForm: UpdateCommentForm) {
    const { id, content } = updateCommentForm;
    return await this.commentModel.findByIdAndUpdate(id, {
      content
    })
  }

  async deleteComment(id: string) {
    return await this.commentModel.findByIdAndDelete(id);
  }

  async queryCommentByArticleId(articleId: string) {
    return await this.commentModel.find({ articleId });
  }
}