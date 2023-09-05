/* eslint-disable @typescript-eslint/no-namespace */
export interface IMailer {
  send(input: MailerDTO.Mail): Promise<void>
}
  
export namespace MailerDTO {
  export type Mail = {
    to: string;
    template: string;
    data: any;
    subject: string;
  };
}