/* eslint-disable eqeqeq */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import CustomError from '../../domain/errors/CustomErrors';
import ITokenGenerator from '../contracts/tokenGenerator';
import TokenGenerator from '../../infra/utils/jwt';
import IHasher from '../contracts/hasher';
import Hasher from '../../infra/cryptograph/hasher';
import { TicketSituations } from '../../domain/interfaces/Ticket';
import { IMailer } from '../contracts/mailer';
import Mailer from '../../infra/mailer/nodemailer';

export default class UserPrismaModel {
  private prisma: PrismaClient;
  private tokenHelper: ITokenGenerator;
  private hasher: IHasher;
  private mailer: IMailer;

  constructor() {
    this.prisma = new PrismaClient();
    this.tokenHelper = new TokenGenerator();
    this.hasher = new Hasher();
    this.mailer = new Mailer();
  }

  public async create(userData: Prisma.UserCreateInput): Promise<void> {
    try {
      const { password, ...otherData } = userData;
      
      const hashedPassword = this.hasher.encrypt(password);

      const user = await this.prisma.user.create({
        data: {
          ...otherData,
          password: hashedPassword,
        },
      });

      const hash = this.hasher.encrypt(user.email);

      await this.prisma.ticket.create({ data: { hash, userId: user.id, situation: TicketSituations.OPEN } });

      await this.mailer.send({
        to: user.email,
        template: 'email-verification',
        data: {
          hash,
          name: user.name,
        },
        subject: 'Verificação de Email',
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new CustomError(409, 'Email já está em uso. Por favor, escolha outro.');
      }

      throw error;
    }
  }

  async signin(credentials: { email: string, password: string }): Promise<string> {
    const userExists = await this.prisma.user.findUnique({ where: { email: credentials.email } });
    if (!userExists) throw new CustomError(401, 'Ocorreu um problema ao fazer login, Verificar seu e-mail ou senha, ou crie uma conta');

    const ticket = await this.prisma.ticket.findFirst({ where: { userId: userExists.id } });

    if (ticket) {
      if (ticket.situation == TicketSituations.OPEN) throw new CustomError(401, 'Conta ainda não verificada');
      await this.prisma.ticket.delete({ where: { id: ticket.id } });
    }
    
    const passwordIsValid = await bcrypt.compare(credentials.password, userExists.password);
    if (!passwordIsValid) throw new CustomError(401, 'Ocorreu um problema ao fazer login, Verificar seu e-mail ou senha, ou crie uma conta'); 

    const tokenPayload = {
      email: credentials.email,
    };

    const token = this.tokenHelper.generate(tokenPayload);
    return token;
  }

}