import { LogModel } from './log.model'
import { MongoDatabase } from '../init'
import { envs } from '../../../config/plugins/envs.plugin'
import mongoose from 'mongoose'

describe('log.model.ts', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL!,
      dbName: envs.MONGO_DB_NAME!,
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  it('should be defined', () => {
    expect(LogModel).toBeDefined()
  })

  it('should have methods', () => {
    expect(LogModel.create).toBeDefined()
    expect(LogModel.find).toBeDefined()
  })

  it('should create a log', async () => {
    const logData = {
      message: 'test-message',
      level: 'low',
      origin: 'log.model.test.ts',
    }

    const log = await LogModel.create(logData)

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      }),
    )

    await LogModel.findOneAndDelete(log.id)
  })

  it('should return the schema object', () => {
    const schema = LogModel.schema.obj

    // log to know the schema and then do the expect
    // console.log(schema)

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          default: 'low',
        },
        origin: { type: expect.any(Function) },
        createdAt: expect.any(Object),
      }),
    )
  })
})
