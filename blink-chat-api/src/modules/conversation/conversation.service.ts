import { BadRequestException, Injectable } from '@nestjs/common';
import { ConversationDto, MessageDto } from './dto/conversation.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { SOCKET_EVENTS } from '../../utils/socketEvents';
import { ReqWithUser } from '../../utils/interfaces/reqWithUser';
import { UserService } from '../user/user.service';
import { USER_MESSAGE } from '../../utils/responseMessages';

@Injectable()
@WebSocketGateway({ cors: true })
export class ConversationService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  server!: Server;
  async create(createConversationDto: ConversationDto, user: User) {
    const createdConversation = await this.prisma.conversation.create({
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

    const chatCandidate = await this.userService.findOne(
      createConversationDto.chatCandidate,
    );

    if (!chatCandidate) {
      throw new BadRequestException(USER_MESSAGE.NOT_FOUND);
    }

    return {
      conversationId: createdConversation.id,
      userEmail: chatCandidate.email,
      userName: `${chatCandidate.firstName} ${chatCandidate.lastName}`,
      profilePic: chatCandidate.profilePic,
    };
  }

  async findAll(request: ReqWithUser) {
    let results: Array<{
      conversationId: string;
      userEmail: string;
      userName: string;
      profilePic: string | null;
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
        profilePic: user.profilePic,
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

  async findAllConversationMessages(id: string) {
    let results: Array<{
      id: string;
      msg: string;
      createdAt: Date;
      conversationId: string;
      userEmail: string;
      userProfilePic: string | null;
    }> = [];
    const conversationMessages = await this.prisma.message.findMany({
      where: { conversationId: id },
    });
    if (conversationMessages.length === 0) return results;
    for (const Message of conversationMessages) {
      const user = await this.userService.findOne(Message.userEmail);
      if (!user) {
        results.push({
          ...Message,
          userProfilePic: null,
        });
        continue;
      }
      results.push({
        ...Message,
        userProfilePic: user.profilePic,
      });
    }

    return results;
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
