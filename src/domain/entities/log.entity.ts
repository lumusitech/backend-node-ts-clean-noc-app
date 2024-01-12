export enum LogSeveretyLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  message: string
  level: LogSeveretyLevel
  origin: string
  createdAt?: Date
}

export class LogEntity {
  public level: LogSeveretyLevel
  public message: string
  public origin: string
  public createdAt?: Date

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options

    this.message = message
    this.level = level
    this.origin = origin
    this.createdAt = createdAt
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json)

    const log = new LogEntity({ level, message, origin, createdAt })

    return log
  }
}
