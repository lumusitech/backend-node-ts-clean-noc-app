import { LogRepository } from '../../repository/log.repository'
import { EmailService } from '../../../presentation/email/email.service'
import { LogEntity, LogSeveretyLevel } from '../../entities/log.entity'

interface SendEmailLogsUseCase {
  execute(to: string | string[]): Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithAttachment(to)

      if (!sent) throw new Error('Email log not sent')

      const log = new LogEntity({
        message: `Log email sent`,
        level: LogSeveretyLevel.low,
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog(log)

      return true
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeveretyLevel.high,
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog(log)

      return false
    }
  }
}
