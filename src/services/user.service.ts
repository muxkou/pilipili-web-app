import { HttpResponse } from '../common/interfaces/http.interface';
import { request } from './request';

export const send = (phone: string): Promise<HttpResponse> => {
  return request(`/auth/send/${phone}`)
};