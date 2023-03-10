import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './models/user.model';
import * as crypto from 'crypto';
import { LoginForm } from 'src/auth/dto/request/login.request';
import { RoleEnum } from './enums/role.enum';
import { SaveForm } from './dto/request/save.request';
import { ConfigService } from '@nestjs/config';
import * as DataLoader from 'dataloader';
import { UpdateUserForm } from './dto/request/updateUser.request';


@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectModel('UserModel') private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  dataLoader = new DataLoader(async (ids: string[]) => {
    return await this.userModel.find({ _id: { $in: ids } });
  });

  // 注册管理员，在config里配置哒
  async onApplicationBootstrap() {
    const adminConfig = this.configService.get('admin');
    const form: SaveForm = {
      name: adminConfig.name,
      nickName: adminConfig.name,
      password: adminConfig.password,
      role: RoleEnum.ADMIN,
    };
    const admin = await this.findByPassword(form);
    if (!admin) {
      await this.saveUser(form);
    }
  }

  async saveUser(saveForm: SaveForm) {
    const { password, name, nickName, role } = saveForm;
    const md5 = crypto.createHash('md5');
    const md5password = md5.update(password).digest('hex');
    const createdUser = new this.userModel({
      name, 
      nickName,
      role,
      password: md5password,
    });
    return await createdUser.save();
  }

  async updateUserById(updateUserForm: UpdateUserForm & { id: string, lastLoginTime?: string }) {
    const { nickName, id, lastLoginTime } = updateUserForm;
    this.dataLoader.clear(id);
    const user = await this.userModel.findByIdAndUpdate(id, { 
      nickName,
      lastLoginTime,
    },  { new: true })
    return user;
  }

  async findByPassword(loginForm: LoginForm) {
    const { password, name } = loginForm;
    const md5 = crypto.createHash('md5');
    const md5password = md5.update(password).digest('hex');
    const user = await this.userModel.findOne({ name, password: md5password });
    return user;
  }

  async findById(id: string) {
    return await this.dataLoader.load(id);
  }

  async findByName(name: string) {
    return await this.userModel.findOne({ name });
  }
}
