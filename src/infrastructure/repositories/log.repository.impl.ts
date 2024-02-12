import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeveretyLevel } from '../../domain/entities/log.entity'
import { LogRepository } from '../../domain/repository/log.repository'

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log)
  }

  async getLogs(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel)
  }
}
