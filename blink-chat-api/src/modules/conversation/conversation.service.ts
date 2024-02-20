import { Injectable } from '@nestjs/common';
import { ConversationDto, UpdateConversationDto } from './dto/conversation.dto';
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

  update(id: string, updateConversationDto: UpdateConversationDto) {
    return this.prisma.conversation.update({
      where: { id },
      data: updateConversationDto,
    });
  }

  remove(id: string) {
    return this.prisma.conversation.delete({ where: { id } });
  }
}
