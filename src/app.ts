import express from 'express';
import 'express-async-errors';
import cors from 'cors';
// import index from './routes/route';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(Route);

export default app;
