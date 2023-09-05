/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import { MailerDTO, IMailer } from '../../application/contracts/mailer';

dotenv.config();

export default class Mailer implements IMailer {
  private readonly transporter!: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    } as any);
  }

  async send(input: MailerDTO.Mail): Promise<void> {
    let html = fs.readFileSync(
      `${__dirname}/template/${input.template}.html`,
      'utf-8',
    );
    
    for (const key in input.data) {
      html = html.replace(`{{${key}}}`, input.data[key]);
    }

    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: input.to,
      subject: input.subject,
      html,
    });
  }
}