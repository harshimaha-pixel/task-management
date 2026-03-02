import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  database: {
    filepath: process.env.DB_FILEPATH || path.join(process.cwd(), 'tasks.sqlite'),
  },
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
};
