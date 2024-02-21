import { Injectable } from '@nestjs/common';
import { ConversationDto, MessageDto } from './dto/conversation.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { SOCKET_EVENTS } from '../../utils/socketEvents';

@Injectable()
@WebSocketGateway({ cors: true })
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  server!: Server;
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

  async createConversationMessage(
    id: string,
    messageDto: MessageDto,
    user: User,
  ) {
    const userConversation = await this.prisma.userConversation.findMany({
      where: { conversationId: id },
    });
    const filteredResult = userConversation.filter(
      (item) => item.userEmail !== user.email,
    );
    const otherUserEmail = filteredResult.map((item) => item.userEmail);
    this.server.emit(SOCKET_EVENTS.NEW_MESSAGE, otherUserEmail[0]);
    return this.prisma.message.create({
      data: {
        msg: messageDto.msg,
        conversationId: id,
        userEmail: user.email,
      },
    });
  }

  removeConversationMessage(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
