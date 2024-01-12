import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDatasource } from '../infrastructure/datasources/flie-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from '../presentation/cron/cron-service'

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
  public static start() {
    console.log('🚀 Server started...\n')

    CronService.createJob('*/3 * * * * *', () => {
      const url = 'https://www.google.com'

      new CheckService(
        fileSystemLogRepository,
        () => console.log(`🟢 Service at ${url} is ok`),
        error => console.log(`🔴 ${error}`),
      ).execute(url)
    })
  }
}
