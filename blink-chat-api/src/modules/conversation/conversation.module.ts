import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from '../user/user.module';
import { ConversationGateway } from './conversation.gateway';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationGateway],
})
export class ConversationModule {}
