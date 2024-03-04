export class ConversationDto {
  chatCandidate: string;
}

export class MessageDto {
  msg: string;
}

export class SocketMessageDto {
  id: string;
  msg: string;
  userEmail: string;
  conversationId: string;
}
