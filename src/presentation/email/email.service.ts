import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      // console.log({ sentInformation })
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithAttachment(to: string | string[]): Promise<boolean> {
    const subject = "Server Logs";
    const htmlBody = `
    <h3>System Logs - NOC</h3>
    <p>Proident cupidatat occaecat ea sit commodo ad veniam.</p>
    <p>review system logs</p>
    `;

    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "logs/logs-all.log" },
      { filename: "logs-medium.log", path: "logs/logs-medium.log" },
      { filename: "logs-high.log", path: "logs/logs-high.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
