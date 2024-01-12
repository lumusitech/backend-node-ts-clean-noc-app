export enum LogSeveretyLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public level: LogSeveretyLevel
  public message: string
  public createdAt: Date

  constructor(level: LogSeveretyLevel, message: string) {
    this.message = message
    this.level = level
    this.createdAt = new Date()
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json)

    // if (!message) throw new Error(`${message} is required`)
    // if (!level) throw new Error(`${level} is required`)
    // if (!createdAt) throw new Error(`${createdAt} is required`)

    const log = new LogEntity(level, message)
    log.createdAt = new Date(createdAt)
    return log
  }
}
