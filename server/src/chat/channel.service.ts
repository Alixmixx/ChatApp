import { Injectable, Logger } from '@nestjs/common';
import {
  CreateChannelFields,
  JoinChannelFields,
  RejoinChannelFields,
} from './channel.types';
import { ChannelRepository } from './channel.repository';
import { random } from 'nanoid';
import { channel } from 'diagnostics_channel';

// Channel Service, implement all the logic of channel functions
@Injectable()
export class ChannelService {
  private readonly logger = new Logger(ChannelService.name);
  constructor(private readonly channelRepository: ChannelRepository) {}
  async createChannel(fields: CreateChannelFields) {
    //Need to change that
    const channelID = random.toString();
    const userID = random.toString();

    const createdChannel = await this.channelRepository.createChannel({
      ...fields,
      channelID,
      userID,
    });

    return {
      channel: createdChannel,
    };
  }

  async joinChannel(fields: JoinChannelFields) {
    const joinedChannel = await this.channelRepository.getChannel(
      fields.channelID,
    );

    this.logger.debug(`Fetching channel ${fields.channelID}`);

    return {
      channel: joinedChannel,
    };
  }

  async rejoinChannel(fields: RejoinChannelFields) {
    const joinedChannel = await this.channelRepository.addUserChannel(fields);

    return joinedChannel;
  }
}
