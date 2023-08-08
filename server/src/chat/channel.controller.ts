import { Body, Controller, Post } from '@nestjs/common';
import { CreateChannelDto, JoinChannelDto } from './dto/channel.dto';
import { ChannelService } from './channel.service';

// Channel Controller, reroute the request body to the services functions
@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  async create(@Body() createPollDto: CreateChannelDto) {
    const result = await this.channelService.createChannel(createPollDto);

    return result;
  }

  @Post('/join')
  async join(@Body() joinChannelDto: JoinChannelDto) {
    const result = await this.channelService.joinChannel(joinChannelDto);

    return result;
  }

  @Post('/rejoin')
  async rejoin() {
    return;
  }
}
