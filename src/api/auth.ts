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

// 내정보
export type MyInfoResponse = {
  name: string;
  sex: string;
  email: string;
};
export const getMyInfo = async (): Promise<MyInfoResponse> => {
  try {
    const { data } = await axiosInstance.get<MyInfoResponse>('/auth/me');
    return data;
  } catch (error) {
    // 디버깅을 위한 콘솔 출력
    console.error('내 정보 조회 실패:', error);
    throw error;
  }
};

/* =========================== [2] 커피(스터디) 목록 조회 =========================== */

// 하위 타입: 커피 상세 정보
export type CoffeeDetail = {
  type: string;
  level: number;
  imageUrl: string;
};

// 하위 타입: 스터디 그룹 정보
export type StudyGroupInfo = {
  groupId: number;
  groupName: string;
  coffee: CoffeeDetail;
};

// 메인 응답 타입
export type MyCoffeesResponse = {
  inProgress: StudyGroupInfo[];
  finished: StudyGroupInfo[];
};

// API 함수
export const getMyCoffees = async (): Promise<MyCoffeesResponse> => {
  try {
    // 명세서 이미지에 적힌 URL 그대로 작성 (/auth/mycoffes)
    // *오타 주의: coffees가 아니라 mycoffes로 되어 있습니다. 백엔드 명세와 일치시킵니다.
    const { data } = await axiosInstance.get<MyCoffeesResponse>('/auth/mycoffes');
    return data;
  } catch (error) {
    console.error('커피 목록 조회 실패:', error);
    throw error;
  }
};
