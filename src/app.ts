import { envs } from './config/plugins/envs.plugin'
import { LogModel, MongoDatabase } from './data/mongo-db'
import { Server } from './presentation/server'
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  // create a document that we want to insert
  // const newLog = await LogModel.create({
  //   message: 'Test message from mongo',
  //   origin: 'App.ts',
  //   level: 'low',
  // })

  // await newLog.save()

  // Once created, we can query it
  const logs = await LogModel.find({ message: { $regex: /mongo 0/i } })

  console.log({ logs })

  Server.start()
}
