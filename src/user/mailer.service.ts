import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jawadc226@gmail.com',
        pass: 'okok dkgs byqr czpi',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const info = await this.transporter.sendMail({
      from: '"Looks Shop" <jawadc226@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return info;
  }

  async sendResetPasswordMail(to: string, token: string) {
    const resetUrl = `http://localhost:3000/auth/restpassword?token=${token}`;

    // frontend HTML page ka local URL
    const htmlContent = `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:40px 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:8px; padding:30px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; color:#333333;">Password Reset Request</h2>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="color:#555555; font-size:15px; line-height:1.6;">
                <p>Hello,</p>

                <p>
                  We received a request to reset your password.  
                  Click the button below to set a new password.
                </p>

                <p style="text-align:center; margin:30px 0;">
                  <a href="${resetUrl}" target="_blank"
                    style="display:inline-block;
                           padding:12px 26px;
                           background:#4e73df;
                           color:#ffffff;
                           text-decoration:none;
                           font-weight:600;
                           border-radius:6px;">
                    Reset Password
                  </a>
                </p>

                <p>
                  If you did not request a password reset, please ignore this email.
                  Your account will remain secure.
                </p>

                <p style="margin-top:30px;">
                  Regards,<br/>
                  <strong>Looks Shop Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top:25px; font-size:12px; color:#999999;">
                © ${new Date().getFullYear()} Looks Shop. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`;

    return await this.transporter.sendMail({
      from: '"Looks Shop" <jawadc226@gmail.com>',
      to,
      subject: 'Reset Your Password',
      html: htmlContent,
    });
  }
}
