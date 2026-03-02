import express, { Express } from 'express';
import sequelize from './config/database';
import { config } from './config/env';
import { setupCors, errorHandler } from './middleware/cors';
import tasksRouter from './routes/tasks';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupCors(app);

// Routes
app.use('/api/tasks', tasksRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Database and server initialization
const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');

    // Sync database models
    await sequelize.sync({ alter: config.server.nodeEnv === 'development' });
    console.log('✓ Database models synchronized');

    // Start server
    app.listen(config.server.port, () => {
      console.log(`✓ Server running on port ${config.server.port}`);
      console.log(`✓ Frontend URL: ${config.server.frontendUrl}`);
      console.log(`✓ Environment: ${config.server.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
