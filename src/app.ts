import express from 'express';
import 'express-async-errors';
import cors from 'cors';
// import { PrismaClient } from '@prisma/client';
import errorMiddleware from './middlewares/errorMiddleware'; 
import userRoute from './routes/user.route';

// const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(errorMiddleware);

export default app;