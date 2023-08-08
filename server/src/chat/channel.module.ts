import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { redisModule } from "src/redis/redis.config";
import { ChannelRepository } from "./channel.repository";

// Channel Module, regroup all channel functionalities
@Module({
	imports: [ConfigModule, redisModule],
	controllers: [ChannelController],
	providers: [ChannelService, ChannelRepository],
})
export class ChannelModule {}
