import { LogEntity, LogSeveretyLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceMultipleSaveUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckServiceMultipleSave implements CheckServiceMultipleSaveUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  private saveLogToRepositories(log: LogEntity) {
    this.logRepositories.forEach(logRepository => logRepository.saveLog(log))
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service ${url}`)

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeveretyLevel.low,
        origin: 'check-service.ts',
      })

      this.saveLogToRepositories(log)

      this.successCallback && this.successCallback()

      return true
    } catch (error) {
      const errorMessage = `${url} is not working. ${error}`

      const log = new LogEntity({
        message: errorMessage,
        level: LogSeveretyLevel.high,
        origin: 'check-service.ts',
      })

      this.saveLogToRepositories(log)

      this.errorCallback && this.errorCallback(errorMessage)

      return false
    }
  }
}
