import { Injectable } from '@nestjs/common';
import { ConversationDto, MessageDto } from './dto/conversation.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  create(createConversationDto: ConversationDto, user: User) {
    return this.prisma.conversation.create({
      data: {
        UserConversation: {
          create: [
            {
              user: { connect: { email: createConversationDto.chatCandidate } },
            },
            {
              user: { connect: { email: user.email } },
            },
          ],
        },
      },
    });
  }

  findAll() {
    return this.prisma.conversation.findMany();
  }

  findOne(id: string) {
    return this.prisma.conversation.findFirst({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.conversation.delete({ where: { id } });
  }

  findAllConversationMessages(id: string) {
    return this.prisma.message.findMany({ where: { conversationId: id } });
  }

  createConversationMessage(
    id: string,
    createMessageDto: MessageDto,
    user: User,
  ) {
    return this.prisma.message.create({
      data: {
        msg: createMessageDto.msg,
        conversationId: id,
        userEmail: user.email,
      },
    });
  }

  removeConversationMessage(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
