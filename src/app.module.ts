import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresenceModule } from './presence/presence.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PresenceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
