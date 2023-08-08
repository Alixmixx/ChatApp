import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { redisModule } from "src/redis/redis.config";

// Channel Module, regroup all channel functionalities
@Module({
	imports: [ConfigModule, redisModule],
	controllers: [ChannelController],
	providers: [ChannelService],
})
export class ChannelModule {}
