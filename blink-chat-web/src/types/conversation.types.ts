export interface ConversationResponse {
  conversationId: string;
  userEmail: string;
  userName: string;
  profilePic: string;
}

export interface ConversationMessagesResponse
  extends Pick<ConversationResponse, 'userEmail' | 'conversationId'> {
  id: string;
  msg: string;
}
