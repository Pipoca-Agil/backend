import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import userRouter from './routes/users.route';

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);

export default app;
