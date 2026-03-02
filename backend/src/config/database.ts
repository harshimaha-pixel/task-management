import { Sequelize } from 'sequelize';
import { config } from './env';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.database.filepath,
  logging: config.server.nodeEnv === 'development' ? console.log : false,
});

export default sequelize;
