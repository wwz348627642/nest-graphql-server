import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PvForm } from './dto/request/pv.request';
import { UvDocument } from './models/uv.model';
import * as moment from 'moment';
import { Uv } from './dto/response/uv.response';
import { UvForm } from './dto/request/uv.request';
import { PvDocument } from './models/pv.model';
import { BiType } from './enums/biType.enum';

@Injectable()
export class BiService {
  constructor(
    @InjectModel('UvModel') private uvModel: Model<UvDocument>,
    @InjectModel('PvModel') private pvModel: Model<PvDocument>,
  ) {}

  async pvByDate(pvForm: PvForm) {
    const { type, startDate, endDate } = pvForm;
    const formatStr = 'YYYY-MM-DD';
    const start = moment(startDate).format(formatStr);
    const end = moment(endDate).format(formatStr);

    const data = await this.pvModel
      .aggregate()
      .project({
        date: { $dateToString: { format: '%Y-%m-%d', date: { '$add': ["$date", 8 * 3600000] } } },
        linkId: '$linkId',
        type: '$type',
        count: '$count'
      })
      .match({
        type,
        date: {
          $gte: start,
          $lte: end,
        },
      })
      .group({
        _id: '$linkId',
        count: {
          $sum: '$count',
        },
      })
      .exec();
    return data;
  }

  async uvByDate(uvForm: UvForm) {
    const { startDate, endDate } = uvForm;
    const formatStr = 'YYYY-MM-DD';
    const start = moment(startDate).format(formatStr);
    const end = moment(endDate).format(formatStr);
    const data: Uv[] = await this.uvModel
      .aggregate()
      .project({
        date: { $dateToString: { format: '%Y-%m-%d', date: { '$add': ["$date", 8 * 3600000] } } },
        count: '$count',
      })
      .match({
        date: {
          $gte: start,
          $lte: end,
        },
      })
      .group({
        _id: '$date',
        count: {
          $sum: '$count',
        },
      })
      .project({
        _id: 0,
        date: '$_id',
        count: '$count',
      })
      .sort({
        date: -1,
      })
      .exec();
    return data;
  }

  async addUv(ip: string) {
    const date = moment().format('YYYY-MM-DD');
    const viewListByIpAndDate = await this.uvModel.aggregate()
      .project({
        date: { $dateToString: { format: '%Y-%m-%d', date: { '$add': ["$date", 8 * 3600000] } } },
        ip: '$ip',
        count: '$count',
      })
      .match({
        date,
        ip,
      });
    const nowView = viewListByIpAndDate[0];
    if (nowView) {
      const count = nowView.count;
      await this.uvModel.findByIdAndUpdate(nowView._id, { count: count + 1 })
    } else {
      const pv = new this.uvModel({ ip });
      pv.save();
    }
  }

  async addPv(form: { ip: string, type: BiType, linkId: string }) {
    const { ip, type, linkId } = form;
    const date = moment().format('YYYY-MM-DD');
    const viewNow = await this.pvModel
      .aggregate()
      .project({
        date: { $dateToString: { format: '%Y-%m-%d', date: { '$add': ["$date", 8 * 3600000] } } },
        ip: '$ip',
        count: '$count',
        linkId: '$linkId',
        type: '$type',
      })
      .match({
        ip,
        date,
        type
      });
    const nowData = viewNow[0];
    if (nowData) {
      const count = nowData.count;
      await this.pvModel.findByIdAndUpdate(nowData._id, { count: count + 1 })
    } else {
      const newUv = new this.pvModel({
        ip,
        linkId,
        type,
      })
      await newUv.save();
    }
  }

  async pvBylinkId(linkId: string) {
    const data = await this.pvModel
      .aggregate()
      .match({
        type: BiType.ARTICLE, 
        linkId
      })
      .group({
        _id: '$linkId',
        sum: {
          $sum: 1,
        }
      })
    return data?.[0];
  }

}
