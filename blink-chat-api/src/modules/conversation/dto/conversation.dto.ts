import { PartialType } from '@nestjs/mapped-types';

export class ConversationDto {
  chatCandidate: string;
}

export class UpdateConversationDto extends PartialType(ConversationDto) {}
