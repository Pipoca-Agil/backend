import express from 'express';
import 'express-async-errors';
import cors from 'cors';
// import errorMiddleware from './middlewares/errorMiddleware'; 
// import { PrismaClient } from '@prisma/client';
// import petRoute from './routes/pets.route';

// const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
// app.use(petRoute);
// app.use(errorMiddleware);

export default app;