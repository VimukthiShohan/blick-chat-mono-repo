import { Injectable } from '@nestjs/common';
import { ConversationDto, MessageDto } from './dto/conversation.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { SOCKET_EVENTS } from '../../utils/socketEvents';
import { ReqWithUser } from '../../utils/interfaces/reqWithUser';
import { UserService } from '../user/user.service';

@Injectable()
@WebSocketGateway({ cors: true })
export class ConversationService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

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

  async findAll(request: ReqWithUser) {
    let results: Array<{
      conversationId: string;
      userEmail: string;
      userName: string;
    }> = [];
    const conversations = await this.prisma.conversation.findMany();
    if (conversations.length === 0) return results;
    for (const conversation of conversations) {
      const userConversation = await this.prisma.userConversation.findMany({
        where: { conversationId: conversation.id },
      });
      const related = userConversation.filter(
        (item) => item.userEmail === request.user.email,
      );
      if (related.length === 0) continue;
      const conversationObj = userConversation.find(
        (item) => item.userEmail !== request.user.email,
      );
      if (conversationObj === undefined) continue;
      const user = await this.userService.findOne(conversationObj.userEmail);
      if (!user) {
        continue;
      }
      results.push({
        ...conversationObj,
        userName: `${user.firstName} ${user.lastName}`,
      });
    }
    return results;
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
    const conversationMsgs = await this.prisma.message.findMany({
      where: { conversationId: id },
    });
    if (conversationMsgs.length === 0) {
      this.server.emit(SOCKET_EVENTS.NEW_CONVERSATION, {
        receiverEmail: otherUserEmail[0],
      });
    }
    const msgCreateObj = await this.prisma.message.create({
      data: {
        msg: messageDto.msg,
        conversationId: id,
        userEmail: user.email,
      },
    });

    this.server.emit(SOCKET_EVENTS.NEW_MESSAGE, {
      receiverEmail: otherUserEmail[0],
      msg: messageDto.msg,
      sentUserEmail: user.email,
      id: msgCreateObj.id,
    });

    return msgCreateObj;
  }

  removeConversationMessage(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
