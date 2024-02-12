import { LogModel } from '../../data/mongo-db'
import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeveretyLevel } from '../../domain/entities/log.entity'

export class MongoLogDatasource extends LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log)
    console.log('Mongo log created: ', newLog.id)
  }

  async getLogs(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel })

    return logs.map(LogEntity.fromObject)
  }
}
