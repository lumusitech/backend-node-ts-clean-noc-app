import fs from "fs";
import { FileSystemDatasource } from "./file-system.datasource";
import path from "path";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";
import { SeverityLevel } from "@prisma/client";

describe("file-system.datasource", () => {
  // const allLogPath = "./logs/logs-all.log";
  // const mediumLogPath = "./logs/logs-medium.log";
  // const highLogPath = "./logs/logs-high.log";
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  it("should create log files if they do not exist", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);
    console.log({ files });
    expect(files).toHaveLength(3);
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  it("should save log to logs-all.log", () => {
    const fsDatasource = new FileSystemDatasource();
    const newLog = new LogEntity({
      message: "test-message",
      level: LogSeveretyLevel.low,
      origin: "file-system.datasource.test.ts",
    });

    fsDatasource.saveLog(newLog);

    const allLogContent = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(allLogContent).toContain(JSON.stringify(newLog));
  });

  it("should save log to logs-all.log and logs-medium.log", () => {
    const fsDatasource = new FileSystemDatasource();
    const newLog = new LogEntity({
      message: "test-message",
      level: LogSeveretyLevel.medium,
      origin: "file-system.datasource.test.ts",
    });

    fsDatasource.saveLog(newLog);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(newLog));
    expect(mediumLogs).toContain(JSON.stringify(newLog));
    expect(highLogs).not.toContain(JSON.stringify(newLog));
  });

  it("should save log to logs-all.log and logs-high.log", () => {
    const fsDatasource = new FileSystemDatasource();

    const newLog = new LogEntity({
      message: "test-message",
      level: LogSeveretyLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    fsDatasource.saveLog(newLog);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(newLog));
    expect(highLogs).toContain(JSON.stringify(newLog));
    expect(mediumLogs).not.toContain(JSON.stringify(newLog));
  });

  it("should return all logs", async () => {
    const fsDatasource = new FileSystemDatasource();

    const lowLog = new LogEntity({
      message: "test-message-low",
      level: LogSeveretyLevel.low,
      origin: "file-system.datasource.test.ts",
    });

    const mediumLog = new LogEntity({
      message: "test-message-medium",
      level: LogSeveretyLevel.medium,
      origin: "file-system.datasource.test.ts",
    });

    const highLog = new LogEntity({
      message: "test-message-high",
      level: LogSeveretyLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    fsDatasource.saveLog(lowLog);
    fsDatasource.saveLog(mediumLog);
    fsDatasource.saveLog(highLog);

    const logsLow = await fsDatasource.getLogs(LogSeveretyLevel.low);
    const logsMedium = await fsDatasource.getLogs(LogSeveretyLevel.medium);
    const logsHigh = await fsDatasource.getLogs(LogSeveretyLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([lowLog, mediumLog, highLog])
    );
    expect(logsMedium).toEqual(expect.arrayContaining([mediumLog]));
    expect(logsHigh).toEqual(expect.arrayContaining([highLog]));
  });

  it("should not throw an error if path exists", () => {
    // to test if the path exists --> return
    new FileSystemDatasource(); // Here create the path
    new FileSystemDatasource(); // Here do the return because the path already exists

    expect(true).toBe(true);
  });

  it("should throw an error if log severity level is not defined", async () => {
    const fsDatasource = new FileSystemDatasource();
    const customseverityLevel =
      "ULTRA-HIGH-LEVEL-NOT-IMPLEMENTED" as LogSeveretyLevel;

    try {
      await fsDatasource.getLogs(customseverityLevel);
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain(`${customseverityLevel} is not implemented`);
    }
  });
});
