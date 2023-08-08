import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis.module';

// Register the RedisModule asynchronously
export const redisModule = RedisModule.registerAsync({
  // Specify any modules that this module depends on
  imports: [ConfigModule],

  // Define a factory function that creates and configures the Redis connection
  useFactory: async (configService: ConfigService) => {

    // Create a logger instance for logging messages related to Redis
    const logger = new Logger('RedisModule');

    // Return configuration options for the Redis connection
    return {
      connectionOptions: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        // Password can be added here if required
      },
      // Define actions to be taken once the Redis client is ready
      onClientReady: (client) => {
        logger.log('Redis Client ready');

        // Listen for any errors that occur with the Redis client
        client.on('error', (err) => {
          logger.error('Redis Client Error: ', err);
        });

        // Listen for the 'connect' event and log a message upon successful connection
        client.on('connect', () => {
          logger.log(
            `Connected to redis on ${client.options.host}:${client.options.port}`,
          );
        });
      },
    };
  },
  // Specify services that need to be injected into the factory function
  inject: [ConfigService],
});
