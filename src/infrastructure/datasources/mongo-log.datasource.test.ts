import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo-db";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeveretyLevel } from "../../domain/entities/log.entity";

describe("mongo-log.datasource", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL!,
      dbName: envs.MONGO_DB_NAME!,
    });
  });

  beforeEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  const logsData = [
    new LogEntity({
      message: "test-message-1",
      level: LogSeveretyLevel.low,
      origin: "log.datasource.test.ts",
    }),

    new LogEntity({
      message: "test-message-2",
      level: LogSeveretyLevel.low,
      origin: "log.datasource.test.ts",
    }),
  ];

  const logDatasource = new MongoLogDatasource();

  it("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDatasource.saveLog(logsData[0]);

    const logs = await logDatasource.getLogs(LogSeveretyLevel.low);

    expect(logSpy).toHaveBeenCalledWith(
      "Mongo log created: ",
      expect.any(String)
    );
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs[0].message).toBe(logsData[0].message);
  });

  it("should get logs", async () => {
    await logDatasource.saveLog(logsData[0]);
    await logDatasource.saveLog(logsData[1]);

    const logs = await logDatasource.getLogs(LogSeveretyLevel.low);

    expect(logs).toHaveLength(2);
    expect(logs[0].level).toBe(LogSeveretyLevel.low);
  });
});
