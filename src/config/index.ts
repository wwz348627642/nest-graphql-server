import { IConfig } from './config.inerface';
import developmentConfig from './dev.config';
import productionConfig from './pro.config';
const configs: { [env: string]: IConfig } = {
  development: developmentConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'development';
export default () => configs[env];