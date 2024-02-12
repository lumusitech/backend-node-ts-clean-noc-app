import { PrismaClient, SeverityLevel } from '@prisma/client'
import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeveretyLevel } from '../../domain/entities/log.entity'

const prismaClient = new PrismaClient()

// Enum to adapt severities
const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource extends LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    // Adapt severities
    const level = severityEnum[log.level]

    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level,
      },
    })
  }

  async getLogs(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    // Adapt severities
    const level = severityEnum[severityLevel]

    const dbLogs = await prismaClient.logModel.findMany({
      where: { level },
    })

    return dbLogs.map(LogEntity.fromObject)
  }
}
