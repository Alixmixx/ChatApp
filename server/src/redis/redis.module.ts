import { DynamicModule, Module } from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';
import {
  RedisModuleOptions,
  RedisAsyncModuleOptions,
  IORedisKey,
} from './redis.types';

@Module({})
export class RedisModule {
  static async registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisAsyncModuleOptions): Promise<DynamicModule> {
    const redisProvider = {
      provide: IORedisKey,
      useFactory: async (...args) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);

        const client = await new IORedis(connectionOptions);

        onClientReady(client);

        return client;
      },
	  inject,
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
