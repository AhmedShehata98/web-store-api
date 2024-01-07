import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerLoaderService } from 'src/config/nodemailer.service';

@Module({
  imports: [MailerModule.forRootAsync({ useClass: MailerLoaderService })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
