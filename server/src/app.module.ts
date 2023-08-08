import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChannelModule } from './chat/channel.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '../.env'
  }), ChannelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
