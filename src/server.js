import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.js';
import { notFoundHandler } from '../src/middleware/notFoundHandler.js';
import { errorHandler } from '../src/middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import categoriesRoutes from './routes/categoriesRoutes.js';

import { logger } from './middleware/logger.js';
import userRoutes from './routes/userRoutes.js';

import feedbacksRoutes from './routes/feedbacksRoutes.js';
import authRoutes from './routes/authRoutes.js';
import publicUserRoutes from './routes/publicUserRoutes.js';
import toolsRoutes from './routes/toolsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);

app.use(cors({
  origin: "https://all-possible-front-production.up.railway.app",
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)),
  app.use('/auth', authRoutes);
app.use(userRoutes);
app.use(publicUserRoutes);
app.use(feedbacksRoutes);
app.use(categoriesRoutes);
app.use(toolsRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
