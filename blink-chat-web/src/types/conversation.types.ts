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

export type ConversationMessageBody = Pick<
  ConversationMessagesResponse,
  'conversationId' | 'msg'
>;

export interface ConversationMessageResponse extends ConversationMessageBody {
  id: string;
  createdAt: string;
  userEmail: string;
}

export interface SocketNewMessageData
  extends Pick<ConversationMessagesResponse, 'msg' | 'id'> {
  receiverEmail: string;
  sentUserEmail: string;
}

export type SocketNewConversationData = Pick<
  SocketNewMessageData,
  'receiverEmail'
>;
