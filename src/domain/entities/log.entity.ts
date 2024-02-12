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

  //? Mappers or Adapters ⬇️ - Probably better outside here

  static fromJson = (json: string): LogEntity => {
    //? Validation
    json = json === '' ? '{}' : json

    const { message, level, createdAt } = JSON.parse(json)

    const log = new LogEntity({ level, message, origin, createdAt })

    return log
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, origin, createdAt } = object

    // TODO: Add validations for each property

    return new LogEntity({ message, level, origin, createdAt })
  }
}
