import { Nullable } from '@/api/apiService';

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
  userProfilePic: Nullable<string>;
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

export interface SocketNewConversationData {
  receiverEmail: string;
}

export interface ConversationCreateBody {
  chatCandidate: string;
}

export type ConversationDeleteResponse = Pick<
  ConversationMessageResponse,
  'id' | 'createdAt'
>;
