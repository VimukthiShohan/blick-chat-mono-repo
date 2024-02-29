import { useQuery } from '@tanstack/react-query';

import { ApiServiceErr, axiosApi } from '@/api/apiService';
import {
  ConversationMessagesResponse,
  ConversationResponse,
} from '@/types/conversation.types';

export const useGetConversations = () =>
  useQuery<ConversationResponse[], ApiServiceErr>(
    [`/conversation`],
    async () => {
      const response = await axiosApi.get(`/conversation`);
      return response.data;
    },
  );

export const useGetConversationMessages = (conversationId: string) =>
  useQuery<ConversationMessagesResponse[], ApiServiceErr>(
    [`/conversation/messages/${conversationId}`],
    async () => {
      const response = await axiosApi.get(
        `/conversation/messages/${conversationId}`,
      );
      return response.data;
    },
  );
