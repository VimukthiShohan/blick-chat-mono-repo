import { Nullable } from '@/api/apiService';
import { BLINK_CHAT_API } from '@/config/constant';

export const getImgUrl = (fileName: Nullable<string>) => {
  if (!fileName) return '';
  else return `${BLINK_CHAT_API}media/${fileName}`;
};
