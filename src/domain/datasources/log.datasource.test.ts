import { LogDatasource } from './log.datasource'
import { LogEntity, LogSeveretyLevel } from '../entities/log.entity'
import { MongoLogDatasource } from '../../infrastructure/datasources/mongo-log.datasource'

describe('log.datasource.ts LogDatasource', () => {
  const newLog = new LogEntity({
    message: 'test-message',
    level: LogSeveretyLevel.low,
    origin: 'log.datasource.test.ts',
  })

  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return
    }

    async getLogs(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
      return [newLog]
    }
  }

  it('should be defined', async () => {
    const mockLogDatasource = new MockLogDatasource()
    expect(typeof mockLogDatasource.saveLog).toBe('function')
    expect(typeof mockLogDatasource.getLogs).toBe('function')

    await mockLogDatasource.saveLog(newLog)
    const logs = await mockLogDatasource.getLogs(LogSeveretyLevel.low)
    expect(logs).toHaveLength(1)
    expect(logs[0]).toBeInstanceOf(LogEntity)
  })
})
