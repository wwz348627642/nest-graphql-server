import { JwtModuleOptions } from "@nestjs/jwt";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export interface IConfig {
  /**
   * jwt 设置
   */
  jwt: JwtModuleOptions;
  /**
   * 数据库配置
   */
  mongodb: MongooseModuleOptions;
  /**
   * 管理员配置
   */
  admin: {
    name: string,
    password: string,
  },
  /**
   * 云存储配置
   */
  qiniu: {
    accessKey: string;
    secretKey: string;
    bucket: string;
  }

}
