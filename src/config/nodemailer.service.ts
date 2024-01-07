import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export class MailerLoaderService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        service: 'gmail',
        host: process.env?.['MAIL_HOST'],
        port: 567,
        secure: false,
        auth: {
          user: process.env?.['MAIL_USER'],
          pass: process.env?.['MAIL_PASSWORD'],
        },
      },
      defaults: {
        from: `No Reply <${process.env?.['MAIL_FROM']}>`,
      },
      template: {
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
