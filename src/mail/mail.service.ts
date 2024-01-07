import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async SendUserEmailConfirmation({
    context,
    subject,
    to,
    template,
  }: {
    to: string;
    subject: string;
    context: {
      name: string;
      code: string;
    };
    template: string;
  }) {
    return await this.mailerService.sendMail({
      to,
      subject,
      context,
      template: join(__dirname, 'templates', template),
    });
  }
}
