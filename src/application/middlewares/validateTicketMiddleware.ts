/* eslint-disable max-len */
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../domain/errors/CustomErrors';
import { TicketSituations } from '../../domain/interfaces/Ticket';
import Hasher from '../../infra/cryptograph/hasher';

export default async function validateTicket(req: Request, res: Response, next: NextFunction) {
  const { hash } = req.query as { hash: string };
  const { email } = req.body;
  const prisma = new PrismaClient();
  const hasher = new Hasher();
  const ticket = await prisma.ticket.findFirst({ where: { hash } });
  if (ticket) {
    const hashIsValid = hasher.compare(ticket.hash, email);
    if (!hashIsValid) throw new CustomError(401, 'A hash passada é invalida para esse usuário');
    await prisma.ticket.update({ where: { id: ticket.id }, data: { situation: TicketSituations.CLOSED } });
  }
  next();
}