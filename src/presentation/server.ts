import { CheckService } from '../domain/use-cases/checks/check-service'
import { CronService } from '../presentation/cron/cron-service'

export class Server {
  public static start() {
    console.log('🚀 Server started...\n')

    CronService.createJob('*/3 * * * * *', () => {
      const url = 'https://www.google.com'

      new CheckService(
        () => console.log(`🟢 Service at ${url} is ok`),
        error => console.log(error),
      ).execute(url)
    })
  }
}
