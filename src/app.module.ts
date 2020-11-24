import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceModule } from './presence/presence.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from 'nestjs-redis';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    TypeOrmModule.forRoot(),
    RedisModule.register({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
    ScheduleModule.forRoot(),
    PresenceModule,
    UsersModule,
  ],
})
export class AppModule {}
