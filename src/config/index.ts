import path from 'path'
import dotenv from 'dotenv'

const root = path.normalize(`${__dirname}/../..`)

const fileName =
  process.env.NODE_ENV === 'production'
    ? '/config-production.env'
    : '/config.env'

const configFile = `${root}${fileName}`
const env = process.env.NODE_ENV || 'development'
const debug = env !== 'production'

dotenv.config({ path: configFile, debug: debug })

export default {
  env: env,
  debug: debug,
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || env === 'production' ? 5000 : 5002
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379/0',
    prefix: process.env.REDIS_PREFIX || 'wc-push'
  },
  fcm: {
    url: process.env.FCM_API_URL || 'https://fcm.googleapis.com/fcm/send',
    apiKey: process.env.FCM_API_KEY || ''
  }
}
