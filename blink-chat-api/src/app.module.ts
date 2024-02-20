import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './modules/user/user.module';
import { ConversationModule } from './modules/conversation/conversation.module';

@Module({
  imports: [PrismaModule.forRoot(), UserModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
