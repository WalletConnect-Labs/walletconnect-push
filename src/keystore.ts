import redis from 'redis'
import bluebird from 'bluebird'

import config from './config'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const redisPrefix = `${config.redis.prefix}:`
const redisClient = redis.createClient({
  url: config.redis.url,
  prefix: `${config.redis.prefix}:`
})

export function setTTL (key, n) {
  return redisClient.expireAsync(key, n)
}

export function getTTL (key) {
  return redisClient.ttlAsync(key)
}

export async function getHashValue (key, field) {
  const data = await redisClient.hgetAsync(key, field)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export async function setHashValue (key, field, data = {}) {
  const value = JSON.stringify(data)
  const result = await redisClient.hsetAsync(key, field, value)
  return result
}

export function setClientDetails (topic, data) {
  const field = 'details'
  return setHashValue(topic, field, data)
}

export function getClientDetails (topic) {
  const field = 'details'
  return getHashValue(topic, field)
}
