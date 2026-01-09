// 세션 조회
import { axiosInstance } from '@/api/axiosinstance';

// 응답 데이터 타입 정의
export type SessionDetailResponse = {
  id: number;
  sessionOrder: number;
  title: string;
  startTime: string; // 날짜는 string으로 옵니다 (예: "2026-01-05")
  endTime: string;
};

// 특정 세션 정보 조회 API
export const getSessionDetail = async (
  groupId: number,
  sessionId: number
): Promise<SessionDetailResponse> => {
  try {
    const { data } = await axiosInstance.get<SessionDetailResponse>(
      `/studyrooms/${groupId}/sessions/${sessionId}`
    );
    return data;
  } catch (error) {
    console.error('세션 상세 정보 조회 실패:', error);
    throw error;
  }
};

// 개별 세션 생성
export type CreateSessionRequest = {
  sessionOrder: number;
  title: string;
  startTime: string; // 예: "2026-01-05"
  endTime: string; // 예: "2026-03-02"
};

// 2. 응답 데이터 타입 (Response Body)
export type CreateSessionResponse = {
  success: boolean;
};

// 3. 세션 생성 API
export const createSession = async (
  groupId: number,
  body: CreateSessionRequest
): Promise<CreateSessionResponse> => {
  try {
    console.log(body);
    const { data } = await axiosInstance.post<CreateSessionResponse>(
      `/studyrooms/${groupId}/sessions`,
      body
    );

    console.log('세션 생성 성공', data);
    return data;
  } catch (error) {
    console.error('세션 생성 실패:', error);
    throw error;
  }
};

// 세션 할 일 보기
export type SessionInfo = {
  id: number;
  sessionOrder: number;
  title: string | null; // null이 들어올 수 있음
  startTime: string;
  endTime: string;
};

export type CoffeeInfo = {
  type: string;
  level: number;
  requiredPerLevel: number;
  current: number;
};

export type ChecklistItem = {
  checklistId: number;
  content: string;
  doneMember: number;
  maxMember: number;
  mySubmission: boolean;
};

// 2. 메인 응답 타입
export type SessionChecklistsResponse = {
  session: SessionInfo;
  coffee: CoffeeInfo;
  checklists: ChecklistItem[];
};

// 3. API 함수
export const getSessionChecklists = async (
  groupId: number,
  sessionId: number
): Promise<SessionChecklistsResponse> => {
  try {
    const { data } = await axiosInstance.get<SessionChecklistsResponse>(
      `/studyrooms/${groupId}/sessions/${sessionId}/checklists`
    );
    return data;
  } catch (error) {
    console.error('세션 할 일 목록 조회 실패:', error);
    throw error;
  }
};

//세션 할 일 생성
// 1. 요청 데이터 타입 (Body)
export type CreateChecklistRequest = {
  title: string;
  description: string;
};

// 2. 응답 데이터 타입
export type CreateChecklistResponse = {
  success: boolean;
};

// 3. API 함수
export const createSessionChecklist = async (
  groupId: number,
  sessionId: number,
  body: CreateChecklistRequest
): Promise<CreateChecklistResponse> => {
  try {
    const { data } = await axiosInstance.post<CreateChecklistResponse>(
      `/studyrooms/${groupId}/sessions/${sessionId}/checklists`,
      body
    );
    return data;
  } catch (error) {
    console.error('세션 할 일 생성 실패:', error);
    throw error;
  }
};

// 제출현황
// 1. 응답 데이터 타입 정의
// 제공된 JSON이 snake_case를 사용하므로 키 이름을 그대로 맞춥니다.
export type SubmissionStatusResponse = {
  session_id: number;
  checklist_id: number;
  content: string;
  description: string;
  start_time: string; // 예: "2026-01-01"
  end_time: string;
  completed: boolean;

  // 글 인증(Task) 또는 타이머 시간(String) 등이 들어옴. 없으면 null
  submission_data: string | null;

  // 사진 인증(Image)의 URL. 없으면 null
  image_path: string | null;

  // 타이머 현재 시간 (초 단위 등으로 추정)
  time_current: number;

  is_verified: boolean;
};

// 2. API 함수
export const getSubmissionStatus = async (
  groupId: number,
  sessionId: number,
  checklistId: number
): Promise<SubmissionStatusResponse> => {
  try {
    const { data } = await axiosInstance.get<SubmissionStatusResponse>(
      `/studyrooms/${groupId}/sessions/${sessionId}/checklists/${checklistId}`
    );
    return data;
  } catch (error) {
    console.error('제출 현황 조회 실패:', error);
    throw error;
  }
};

//체크리스트 제출
// 1. 요청 데이터 타입 (Request Body)
// 명세서의 Request 컬럼 참고 (camelCase)
export type SubmitChecklistRequest = {
  memberId: number;
  content?: string; // 글 인증 시 사용
  timeAim?: number; // 타이머 목표 설정 등 (명세서 예시: 60)
  imagePath?: string; // 사진 인증 시 사용
};

// 2. 응답 데이터 타입 (Response Body)
// 명세서의 Response 컬럼 참고 (snake_case)
export type SubmitChecklistResponse = {
  member_id: number;
  submission_data: string | null; // "제출할 텍스트 내용" 또는 "120" 등
  image_path: string | null; // S3 이미지 URL 등
};

// 3. API 함수
export const submitChecklist = async (
  groupId: number,
  sessionId: number,
  checklistId: number,
  body: SubmitChecklistRequest
): Promise<SubmitChecklistResponse> => {
  try {
    // URL의 {checklist_id} 부분에 checklistId 변수를 넣습니다.
    const { data } = await axiosInstance.post<SubmitChecklistResponse>(
      `/studyrooms/${groupId}/sessions/${sessionId}/checklists/${checklistId}`,
      body
    );
    return data;
  } catch (error) {
    console.error('체크리스트 인증 제출 실패:', error);
    throw error;
  }
};
