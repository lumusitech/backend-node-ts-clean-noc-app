import { LogEntity, LogSeveretyLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("Send Email Logs", () => {
  const mockEmailService = {
    sendEmailWithAttachment: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => jest.clearAllMocks());

  it("should call sendEmail and saveLog", async () => {
    const result = await sendEmailLogs.execute("to");

    expect(result).toBeTruthy();

    expect(mockEmailService.sendEmailWithAttachment).toHaveBeenCalledTimes(1);

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log email sent",
      origin: "send-email-logs.ts",
    });
  });

  it("should log in case of error", async () => {
    mockEmailService.sendEmailWithAttachment.mockResolvedValue(false);

    const result = await sendEmailLogs.execute("to");

    expect(result).toBeFalsy();

    expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-logs.ts",
    });
  });
});
