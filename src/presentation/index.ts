import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import app from './app';

const PORT = process.env.PORT || 3001;

const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Running server on port: ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
