import { CheckService } from '../domain/use-cases/checks/check-service'
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'

// const emailService = new EmailService()
// const logRepository = new LogRepositoryImpl(new MongoLogDatasource())
// const logRepository = new LogRepositoryImpl(new FileSystemDatasource())
const logRepository = new LogRepositoryImpl(new PostgresLogDatasource())

export class Server {
  public static async start() {
    console.log('🚀 Server started...\n')

    // Email Service
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'lumusika@gmail.com',
    //   'figueroacarlosluciano@gmail.com',
    // ])

    // Cron Service
    CronService.createJob('*/3 * * * * *', () => {
      const url = 'https://www.google.com'

      new CheckService(
        logRepository,
        () => console.log(`🟢 Service at ${url} is ok`),
        error => console.log(`🔴 ${error}`),
      ).execute(url)
    })
  }
}
