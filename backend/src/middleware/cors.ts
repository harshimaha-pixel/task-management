import cors from 'cors';
import { Express } from 'express';
import { config } from '../config/env';

export const setupCors = (app: Express): void => {
  app.use(
    cors({
      origin: config.server.frontendUrl,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
};

export const errorHandler = (err: any, req: any, res: any, next: any): void => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
