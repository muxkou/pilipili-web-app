import { User } from './user.interface';

export interface GlobalState {
  user: User | null
};

export interface HttpResponse {
  statusCode?: number,
  error?: string,
  data?: any,
  message: string
}