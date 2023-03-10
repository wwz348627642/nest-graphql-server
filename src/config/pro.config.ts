import { IConfig } from "./config.inerface";

const proConfig: IConfig = {
  jwt: {
    secret: 'secretKey',
    signOptions: {
      expiresIn: '7d',
    }
  },
  mongodb: {
    uri: 'mongodb://127.0.0.1:27017/blog',
  },
  admin: {
    name: '',
    password: '',
  },
  qiniu: {
    accessKey: '',
    secretKey: '',
    bucket: '',
  }
}

export default proConfig;
