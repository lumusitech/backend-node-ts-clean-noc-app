import { FileSystemDatasource } from '../infrastructure/datasources/flie-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'

// const emailService = new EmailService()
// const logRepository = new LogRepositoryImpl(new MongoLogDatasource())
const logRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
  public static async start() {
    console.log('🚀 Server started...\n')

    // Email Service
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'lumusika@gmail.com',
    //   'figueroacarlosluciano@gmail.com',
    // ])

    // query for read logs from Mongo as test - can delete it
    // const logs = await logRepository.getLogs(LogSeveretyLevel.high)
    // console.log('🟢 Logs: ', logs)

    // Cron Service
    // CronService.createJob('*/3 * * * * *', () => {
    //   const url = 'https://www.google.com'

    //   new CheckService(
    //     logRepository,
    //     () => console.log(`🟢 Service at ${url} is ok`),
    //     error => console.log(`🔴 ${error}`),
    //   ).execute(url)
    // })
  }
}
