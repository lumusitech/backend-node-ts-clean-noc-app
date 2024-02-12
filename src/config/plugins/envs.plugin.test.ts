import { envs } from './envs.plugin'

describe('envs.plugin.ts', () => {
  it('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'lumusitech@gmail.com',
      MAILER_SECRET_KEY: 'ftccsdqclxafayah',
      PROD: false,
      MONGO_URL: 'mongodb://lumusitech:123456test@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'lumusitech',
      MONGO_PASS: '123456test',
    })
  })

  it('should return error if not found env', async () => {
    jest.resetModules()
    process.env.PORT = ''

    // reload import of envs.plugin
    try {
      await import('./envs.plugin')
      expect(true).toBe(false)
    } catch (error) {
      expect(`${error}`).toContain('"PORT" is a required variable, but its value was empty')
    }
  })
})
