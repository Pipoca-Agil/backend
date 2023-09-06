import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import errorMiddleware from '../application/middlewares/errorMiddleware'; 
import userRoute from '../infra/routes/user';

const app = express();
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(errorMiddleware);

export default app;