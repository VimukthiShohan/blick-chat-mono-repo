import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  create(createConversationDto: CreateConversationDto) {
    return this.prisma.conversation.create({ data: createConversationDto });
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
