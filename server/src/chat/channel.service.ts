import { Injectable } from '@nestjs/common';
import {
  CreateChannelFields,
  JoinChannelFields,
  RejoinChannelFields,
} from './channel.types';

// Channel Service, implement all the logic of channel functions
@Injectable()
export class ChannelService {
  async createChannel(fields: CreateChannelFields) {
    return {
      ...fields,
    };
  }

  async joinChannel(fields: JoinChannelFields) {
    return {
      ...fields,
    };
  }

  async rejoinChannel(fields: RejoinChannelFields) {
	return fields;
  }
}
