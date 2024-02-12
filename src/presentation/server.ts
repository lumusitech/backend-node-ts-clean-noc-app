import { CronService } from './cron/cron-service'

// const emailService = new EmailService()
// const logMongoRepository = new LogRepositoryImpl(new MongoLogDatasource())
// const logFileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource())
// const logPostgresRepository = new LogRepositoryImpl(new PostgresLogDatasource())

export class Server {
  public static async start() {
    console.log('🚀 Server started...\n')

    // Email Service
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'lumusika@gmail.com',
    //   'figueroacarlosluciano@gmail.com',
    // ])

    // Cron Service - ping google.com
    CronService.createJob('*/3 * * * * *', () => {
      // const url = 'https://www.google.com'
      //
      // Single save
      // new CheckService(
      //   logRepository,
      //   () => console.log(`🟢 Service at ${url} is ok`),
      //   error => console.log(`🔴 ${error}`),
      // ).execute(url)
      //
      // Multiple save
      // new CheckServiceMultipleSave(
      //   [logFileSystemRepository, logPostgresRepository, logMongoRepository],
      //   () => console.log(`🟢 Service at ${url} is ok`),
      //   error => console.log(`🔴 ${error}`),
      // ).execute(url)
    })
  }
}
