import { SeverityLevel } from '@prisma/client'
import { LogEntity, LogSeveretyLevel } from './log.entity'

describe('log.entity.ts LogEntity', () => {
  const dataObj = {
    message: 'test-message',
    level: LogSeveretyLevel.low,
    origin: 'log.entity.test.ts',
  }

  it('should create a log entity instance', () => {
    const log = new LogEntity(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  it('should create a log entity from json', () => {
    const json = `{"message":"Service https://www.google.com working","level":"low","origin":"check-service.ts","createdAt":"2024-02-13T18:22:45.171Z"}`

    const log = LogEntity.fromJson(json)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('Service https://www.google.com working')
    expect(log.level).toBe(LogSeveretyLevel.low)
    expect(log.origin).toBe('check-service.ts')
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  it('should create a log entity from object', () => {


    const log = LogEntity.fromObject(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})
