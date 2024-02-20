import { User } from '@prisma/client';

export interface ReqWithUser extends Request {
  user: User;
}
