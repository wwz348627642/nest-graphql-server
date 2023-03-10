import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Image } from './dto/response/image.response';
import * as qiniu from 'qiniu';
import { IConfig } from 'src/config/config.inerface';
import { MediaService } from './media.service';
import { ApolloError } from 'apollo-server-express';
import { MediaCreateForm } from './dto/request/media.createForm';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@Resolver(() => Image)
export class MediaResolver {
  constructor(
    private configService: ConfigService,
    private mediaService: MediaService,
  ) {}

  @UseGuards(AdminGuard)
  @Query(() => String, {
    description: '获取上传凭证',
  })
  async getUploadToken() {
    const qiniuConfig: IConfig['qiniu'] = this.configService.get('qiniu');
    const { accessKey, secretKey, bucket } = qiniuConfig;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket
    });
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }

  @Query(() => [Image], {
    description: '获取图片列表'
  })
  async getImageList () {
    try {
      return await this.mediaService.list();
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Image, {
    description: '添加图片',
  })
  async addImage (
    @Args('mediaCreateForm') mediaCreateForm: MediaCreateForm,
  ) {
    try {
      return await this.mediaService.create(mediaCreateForm);
    } catch (e) {
      return new ApolloError(e.message);
    }
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Boolean, {
    description: '删除图片',
  })
  async deleteMediaById (@Args('id') id: string) {
    try {
      const data = await this.mediaService.deleteMedia(id);
      const qiniuConfig: IConfig['qiniu'] = this.configService.get('qiniu');
      const { accessKey, secretKey, bucket } = qiniuConfig;
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      let config = new qiniu.conf.Config({
        // 华南 - 广东
        zone: qiniu.zone.Zone_z2,
      });
      const bucketManager = new qiniu.rs.BucketManager(mac, config);
      bucketManager.delete(bucket, data.url, (err) => {
        if (err) {
          console.log('删除七牛云文件失败', err);
        }
      })
      return true;
    } catch (e) {
      return new ApolloError(e.message);
    }
  }
}
