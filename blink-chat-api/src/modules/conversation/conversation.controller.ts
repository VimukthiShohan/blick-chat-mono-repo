import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationDto } from './dto/conversation.dto';
import { ReqWithUser } from '../../utils/interfaces/reqWithUser';
import { AuthGuard } from '../user/guards/jwt-auth.guard';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  create(
    @Body() createConversationDto: ConversationDto,
    @Req() request: ReqWithUser,
  ) {
    return this.conversationService.create(createConversationDto, request.user);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.conversationService.remove(id);
  }
}
