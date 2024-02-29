import { useQuery } from '@tanstack/react-query';

import { ApiServiceErr, axiosApi } from '@/api/apiService';
import { ConversationResponse } from '@/types/conversation.types';

export const useGetConversations = () =>
  useQuery<ConversationResponse[], ApiServiceErr>(
    [`/conversation`],
    async () => {
      const response = await axiosApi.get(`/conversation`);
      return response.data;
    },
  );
