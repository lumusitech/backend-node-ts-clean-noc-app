import { CheckService } from '../domain/use-cases/checks/check-service'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasources/flie-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from '../presentation/cron/cron-service'
import { EmailService } from './email/email.service'

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource())
const emailService = new EmailService()

export class Server {
  public static start() {
    console.log('🚀 Server started...\n')

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'lumusika@gmail.com',
    //   'figueroacarlosluciano@gmail.com',
    // ])

    // CronService.createJob('*/3 * * * * *', () => {
    //   const url = 'https://www.google.com'

    // new CheckService(
    //   fileSystemLogRepository,
    //   () => console.log(`🟢 Service at ${url} is ok`),
    //   error => console.log(`🔴 ${error}`),
    // ).execute(url)
    // })
  }
}
