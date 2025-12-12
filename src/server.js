// src/server.js
import cookieParser from 'cookie-parser';
import express from 'express';
import { connectMongoDB } from './db/connectMongoDB.js';
import userRoutes from './routes/userRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
