import { CronService } from '../presentation/cron/cron-service'

export class Server {
  public static start() {
    console.log('🚀 Server started...')

    CronService.createJob('*/5 * * * * *', () => {
      const date = new Date()
      console.log('fired each 5 sec', date)
    })
    CronService.createJob('*/2 * * * * *', () => {
      const date = new Date()
      console.log('fired each 2 sec', date)
    })
    CronService.createJob('*/3 * * * * *', () => {
      const date = new Date()
      console.log('fired each 3 sec', date)
    })
  }
}
