require('dotenv').config();

export default {
  redis: {
    host: process.env.REDIS_HOST,
    db: 0,
    password: process.env.REDIS_PASSWORD,
    port: 6379,
    maxRetriesPerRequest: null,
    enableReadyCheck: true
  },
  defaultJobOptions: {

  },
  limiter: {
    max: 6,
    duration: 2000,
    bounceBack: true
  }
}
