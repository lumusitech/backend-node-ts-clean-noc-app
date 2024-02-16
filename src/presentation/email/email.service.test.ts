import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from "nodemailer";

describe("EmailService", () => {
  const mockSendEmail = jest.fn();

  // Mock for createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });

  const emailService = new EmailService();

  it("should send email", async () => {
    const options: SendEmailOptions = {
      to: "to",
      subject: "subject",
      htmlBody: "htmlBody",
    };

    await emailService.sendEmail(options);

    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      to: options.to,
      subject: options.subject,
      html: options.htmlBody,
    });
  });

  it("should send email with attachments", async () => {
    const email = "to@email.com";
    await emailService.sendEmailWithAttachment(email);

    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "logs/logs-all.log" },
        { filename: "logs-medium.log", path: "logs/logs-medium.log" },
        { filename: "logs-high.log", path: "logs/logs-high.log" },
      ]),
      to: email,
      subject: "Server Logs",
      html: expect.any(String),
    });
  });
});
