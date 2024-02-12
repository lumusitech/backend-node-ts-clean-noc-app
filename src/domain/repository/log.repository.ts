import { LogEntity, LogSeveretyLevel } from '../entities/log.entity'

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeveretyLevel): Promise<LogEntity[]>
}
