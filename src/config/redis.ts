import type { RedisOptions } from 'ioredis';

import { parseInt } from 'lodash';

export const redisConfig: RedisOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0'),
    keyPrefix: 'nextapp:',
};
