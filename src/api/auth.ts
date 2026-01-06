import { axiosInstance } from '@/api/axiosinstance';
import type { AuthToken, LoginRequest, RegisterRequest } from '@/types/auth.type';

// 회원가입
export const postSignup = async (body: RegisterRequest): Promise<void> => {
  await axiosInstance.post('/auth/register', body);
};

// 로그인
export const postLogin = async (body: LoginRequest): Promise<AuthToken> => {
  const { data } = await axiosInstance.post<AuthToken>('/auth/login', body);
  return data;
};
