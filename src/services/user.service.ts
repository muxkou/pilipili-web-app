import { HttpResponse } from '../common/interfaces/http.interface';
import { request } from './request';

// interface IUserExit {
//   nickName?: string,
//   phone?: string
// }

export const exit = (nickName: string): Promise<HttpResponse> => {
  return request(`/auth/exsit?nickName=${nickName}`);
};
export const send = (phone: string): Promise<HttpResponse> => {
  return request(`/auth/send/${phone}`)
};

export const register = (data: any): Promise<HttpResponse> => {
  return request('/auth/register', data, { method: 'POST' });
};

export const login = (data: any): Promise<HttpResponse> => {
  return request('/auth/login', data, { method: 'POST' });
};

export const profile = (): Promise<HttpResponse> => {
  return request('/user/profile');
};