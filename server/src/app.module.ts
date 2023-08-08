import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelModule } from './chat/channel.module';

@Module({
  imports: [ConfigModule.forRoot(), ChannelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
