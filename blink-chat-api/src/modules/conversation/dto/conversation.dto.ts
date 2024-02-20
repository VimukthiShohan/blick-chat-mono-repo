import { PartialType } from '@nestjs/mapped-types';

export class ConversationDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export class UpdateConversationDto extends PartialType(ConversationDto) {}
