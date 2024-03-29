import { Injectable } from '@nestjs/common';
import { ErrorResponse, Resend } from 'resend';
import { CreateEmailResponseSuccess } from './mail.interface';

@Injectable()
export class MailService {
  private _resend = new Resend(process.env.RESEND_SERVICE_API_KEY);

  async sendEmail({
    html,
    subject,
    to,
  }: {
    to: string;
    subject: string;
    html: string;
  }): Promise<CreateEmailResponseSuccess | ErrorResponse> {
    const { data, error } = await this._resend.emails.send({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  confirmEmailTemplate({ name, otpCode }: { name: string; otpCode: string }) {
    return `
      <b>hello dir : ${name}</b>
      <br />
      <p>this is e-mail verification to validate your email .</p>
      <br />
      <div>
        <p>${otpCode}</p>
      </div>
    `;
  }

  resetAccountPassword({ name, otpCode }: { name: string; otpCode: string }) {
    return `
      <div>
        <center>This is a password reset request</center>
        <span>
          <p>  OTP code for ${name} is : </p>
          <code>${otpCode}</code>
          <br/>
          <b>Sincerely,</b>
          <br/>
          <strong>Web Store Team</strong>
        </span>
      </div>
    `;
  }
}
