import { Prisma, PrismaClient, User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import CustomError from '../errors/CustomErrors';

export default class UserPrismaModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(userData: Prisma.UserCreateInput): Promise<UserModel> {
    try {
      const { password, ...otherData } = userData;
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = this.prisma.user.create({
        data: {
          ...otherData,
          password: hashedPassword,
        },
      });

      return await createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new CustomError(400, 'Email já está em uso. Por favor, escolha outro.');
      }

      throw error;
    }
  }
}