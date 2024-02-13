import { MongoDatabase } from './init'
import mongoose from 'mongoose'

describe('init.ts', () => {
  afterAll(() => {
    mongoose.connection.close()
  })

  it('should return true', async () => {
    const result = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    })

    expect(result).toBeTruthy()
  })

  it('should return error', async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: 'mongodb://lumusitech:123456test@localscsascascsacahost:27017',
        dbName: process.env.MONGO_DB_NAME!,
      })

      expect(true).toBe(false)
    } catch (error) {}
  })
})
