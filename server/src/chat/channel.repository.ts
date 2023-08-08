import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { IORedisKey } from 'src/redis/redis.types';
import { AddUserChannelData, CreateChannelData } from './channel.types';
import { Channel } from 'shared';
import { channel } from 'diagnostics_channel';

@Injectable()
export class ChannelRepository {
  private readonly logger = new Logger(ChannelRepository.name);

  constructor(
    configService: ConfigService,
    @Inject(IORedisKey) private readonly redisClient: Redis,
  ) {
    // Nothing to see here
  }

  async createChannel({
    topic,
    channelID,
    userID,
  }: CreateChannelData): Promise<Channel> {
    const initChannel = {
      id: channelID,
      topic,
      users: {},
      adminID: userID,
    };

    this.logger.log(
      `Creating new channel: ${JSON.stringify(initChannel, null, 2)}`,
    );

    const key = `channel:${channelID}`;

    try {
      await this.redisClient
        .multi([
          ['send_command', 'JSON.SET', key, '.', JSON.stringify(initChannel)],
          ['expire', key],
        ])
        .exec();
      return initChannel;
    } catch (e) {
      this.logger.error(
        `Failed to add poll ${JSON.stringify(initChannel)}\n${e}`,
      );
      throw new InternalServerErrorException();
    }
  }

  async getChannel(channelID: string): Promise<Channel> {
    this.logger.log(`Attempting to get a channel: ${channelID}`);

    const key = `channel:${channelID}`;

    try {
      const currentChannel = await this.redisClient.send_command(
        'JSON.GET',
        key,
        '.',
      );

      this.logger.verbose(currentChannel);

      return JSON.parse(currentChannel);
    } catch (e) {
      this.logger.error(`Failed to get the channel ${channelID}`);
      throw e;
    }
  }

  async addUserChannel({
    channelID,
    userID,
    name,
  }: AddUserChannelData): Promise<Channel> {
    this.logger.log(`Attempting to add user ${userID} to channel ${channel}`);

    const key = `channel:${channelID}`;
    const usersPath = `.users.${userID}`;

    try {
      await this.redisClient.send_command(
        'JSON.SET',
        key,
        usersPath,
        JSON.stringify(name),
      );

      const channelJSON = await this.redisClient.send_command(
        'JSON.GET',
        key,
        '.',
      );

      const channel = JSON.parse(channelJSON) as Channel;

      this.logger.debug(
        `Current users in channel: ${channelID}:`,
        channel.users,
      );

      return channel;
    } catch (e) {
      this.logger.error(`Failed to add user ${userID} to channel ${channelID}`);
	  throw e;
    }
  }
}
