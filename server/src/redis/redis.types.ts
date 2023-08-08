import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

// Define a constant key to identify the IoRedis provider
export const IORedisKey = 'IORedis';

// Define the options for the Redis module
export type RedisModuleOptions = {
  connectionOptions: RedisOptions; // Configuration options for connecting to Redis
  onClientReady?: (client: Redis) => void; // Callback function to be executed when the Redis client is ready
};

// Define options for the Redis async module, including a factory function to create RedisModuleOptions
export type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions; // Factory function to create RedisModuleOptions asynchronously
} & Pick<ModuleMetadata, 'imports'> & // Inherit module metadata options like imports
  Pick<FactoryProvider, 'inject'>; // Inherit provider injection options from FactoryProvider
