import { axiosInstance } from '@/api/axiosinstance';

/* =========================== [1] 공지글 (Notice) =========================== */

// 1-1. 공지글 조회 응답 타입
export type NoticeResponse = {
  title: string;
  content: string;
  createdAt: string; // 예: "2025-12-27T10:42:15"
};

// 1-2. 공지글 생성 요청 타입
export type CreateNoticeRequest = {
  title: string;
  content: string;
};

// 1-3. 공지글 생성 응답 타입
export type CreateNoticeResponse = {
  success: boolean;
};

// [API] 공지글 조회
export const getNotice = async (groupId: number): Promise<NoticeResponse> => {
  try {
    const { data } = await axiosInstance.get<NoticeResponse>(`/studyrooms/${groupId}/notice`);
    return data;
  } catch (error) {
    console.error('공지글 조회 실패:', error);
    throw error;
  }
};

// [API] 공지글 생성
export const createNotice = async (
  groupId: number,
  body: CreateNoticeRequest
): Promise<CreateNoticeResponse> => {
  try {
    const { data } = await axiosInstance.post<CreateNoticeResponse>(
      `/studyrooms/${groupId}/notice`,
      body
    );
    return data;
  } catch (error) {
    console.error('공지글 생성 실패:', error);
    throw error;
  }
};

/* =========================== [2] 스탬프 (Stamp) =========================== */

// 2-1. 스탬프 세션 정보 타입
export type StampSession = {
  sessionId: number;
  completionPercent: number;
};

// 2-2. 스탬프 전체 조회 응답 타입
export type StampResponse = {
  totalSessions: number;
  completedSessions: number;
};

// [API] 스탬프 목록 조회
export const getStamps = async (groupId: number): Promise<StampResponse> => {
  try {
    const { data } = await axiosInstance.get<StampResponse>(
      `/studyrooms/${groupId}/sessions/progress`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error('스탬프 조회 실패:', error);
    throw error;
  }
};

/* =========================== [3] 타이머/공부이력 (Timer & Logs) =========================== */

// 3-1. 공부 이력(로그) 타입
export type StudyLog = {
  id: number;
  time: number; // 초 단위
  createdAt: string; // 생성 시간
};

// 3-2. 타이머 종료 요청 타입
export type EndTimerRequest = {
  time: number; // 초 단위 (예: 1080)
  createdAt: string; // "yyyy-MM-dd'T'HH:mm:ss"
};

// 3-3. 타이머 종료 응답 타입
export type EndTimerResponse = {
  success: boolean;
};

// [API] 해당 세션의 공부 이력 조회
export const getStudyLogs = async (groupId: number, sessionId: number): Promise<StudyLog[]> => {
  try {
    const { data } = await axiosInstance.get<StudyLog[]>(
      `/studyrooms/${groupId}/${sessionId}/studylogs`
    );
    return data;
  } catch (error) {
    console.error('공부 이력 조회 실패:', error);
    throw error;
  }
};

// [API] 타이머(공부하기) 종료하기
export const endTimer = async (
  groupId: number,
  sessionId: number,
  body: EndTimerRequest
): Promise<EndTimerResponse> => {
  try {
    const { data } = await axiosInstance.post<EndTimerResponse>(
      `/studyrooms/${groupId}/${sessionId}/study`,
      body
    );
    return data;
  } catch (error) {
    console.error('타이머 종료 요청 실패:', error);
    throw error;
  }
};
