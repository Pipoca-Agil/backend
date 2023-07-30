/* eslint-disable max-len */
import { Prisma, PrismaClient, User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import CustomError from '../errors/CustomErrors';
import TokenHelper from '../helpers/tokenHelper';

export default class UserPrismaModel {
  private prisma: PrismaClient;
  private tokenHelper: TokenHelper;

  constructor() {
    this.prisma = new PrismaClient();
    this.tokenHelper = new TokenHelper();
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

  async signin(credentials: { email: string, password: string }): Promise<string> {
    const userExists = await this.prisma.user.findUnique({ where: { email: credentials.email } });
    if (!userExists) throw new CustomError(401, 'Ocorreu um problema ao fazer login, Verificar seu e-mail ou senha, ou crie uma conta');

    const passwordIsValid = await bcrypt.compare(credentials.password, userExists.password);
    if (!passwordIsValid) throw new CustomError(401, 'Ocorreu um problema ao fazer login, Verificar seu e-mail ou senha, ou crie uma conta'); 

    const tokenPayload = {
      email: credentials.email,
    };

    const token = this.tokenHelper.createToken(tokenPayload);
    return token;
  }
}