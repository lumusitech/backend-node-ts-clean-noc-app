import fs from 'fs'
import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeveretyLevel } from '../../domain/entities/log.entity'

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/'
  private readonly allLogPath = 'logs/logs-all.log'
  private readonly mediumLogPath = 'logs/logs-medium.log'
  private readonly highLogPath = 'logs/logs-high.log'

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    ;[this.allLogPath, this.mediumLogPath, this.highLogPath].forEach(path => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '')
      }
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(newLog)

    fs.appendFileSync(this.allLogPath, logAsJson + '\n')

    if (newLog.level === LogSeveretyLevel.low) return

    if (newLog.level === LogSeveretyLevel.medium) {
      fs.appendFileSync(this.mediumLogPath, logAsJson + '\n')
    } else {
      fs.appendFileSync(this.highLogPath, logAsJson + '\n')
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8')

    const logs = content.split('\n').map(LogEntity.fromJson)

    return logs
  }

  async getLogs(severityLevel: LogSeveretyLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeveretyLevel.low:
        return this.getLogsFromFile(this.allLogPath)
      case LogSeveretyLevel.medium:
        return this.getLogsFromFile(this.mediumLogPath)
      case LogSeveretyLevel.high:
        return this.getLogsFromFile(this.highLogPath)
      default:
        throw new Error(`${severityLevel} is not implemented`)
    }
  }
}
