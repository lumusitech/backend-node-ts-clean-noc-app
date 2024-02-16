import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepositoryImpl", () => {
  beforeEach(() => jest.clearAllMocks());

  const logDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(logDatasource);

  const newLog = new LogEntity({
    message: "test-message-1",
    level: LogSeveretyLevel.low,
    origin: "log.repository.impl.test.ts",
  });

  // or
  //   const newLogalternative = {
  //     message: "test-message-2",
  //     level: LogSeveretyLevel.low,
  //   } as LogEntity;

  it("should save log with arguments", async () => {
    await logRepository.saveLog(newLog);

    expect(logDatasource.saveLog).toHaveBeenCalledTimes(1);
    expect(logDatasource.saveLog).toHaveBeenCalledWith(newLog);
  });

  it("should get logs with arguments", async () => {
    const lowSeverity = LogSeveretyLevel.low;
    await logRepository.getLogs(lowSeverity);

    expect(logDatasource.getLogs).toHaveBeenCalledTimes(1);
    expect(logDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);
  });
});
