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
    console.log('세션 상세 정보', data);
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
  title: string;
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
    console.log('체크리스트가 생성되었습니다.');
    return data;
  } catch (error) {
    console.error('세션 할 일 생성 실패:', error);
    throw error;
  }
};

// [GET] 제출 현황 - 개별 제출 항목 타입 (명세서 submissions 배열 내부)
export type SubmissionItem = {
  id: number;
  content: string | null;
  imagePath: string | null;
  isVerified: boolean;
  submittedAt: string; // "2026-01-11T..."
  username: string; // "test1234"
};

// [GET] 제출 현황 전체 응답 타입 (명세서 구조 반영)
export type SubmissionStatusResponse = {
  session: {
    id: number;
    title: string | null;
    startTime: string;
    endTime: string;
  };
  checklist: {
    title: string;
    description: string;
  };
  submissions: SubmissionItem[]; // 제출된 목록 배열
};

// 2. 제출 현황 조회 API
export const getSubmissionStatus = async (
  groupId: number,
  sessionId: number,
  checklistId: number
): Promise<SubmissionStatusResponse> => {
  try {
    const { data } = await axiosInstance.get<SubmissionStatusResponse>(
      `/studyrooms/${groupId}/sessions/${sessionId}/checklists/${checklistId}`
    );
    console.log('제출 현황', data);
    return data;
  } catch (error) {
    console.error('제출 현황 조회 실패:', error);
    throw error;
  }
};

//체크리스트 제출
// 1. 요청 데이터 타입 (File 객체 포함)
export type SubmitChecklistRequest = {
  memberId: number; // 명세서엔 없지만 요청하신 타입에 있어 포함 (필요 없다면 제거)
  content?: string;
  file?: File; // imagePath(string) -> file(File)로 변경 (Multipart 전송용)
};

// 2. 응답 데이터 타입
export type SubmitChecklistResponse = {
  member_id: number;
  submission_data: string | null;
  image_path: string | null;
};

// 3. API 함수 (FormData 사용)
export const submitChecklist = async (
  groupId: number,
  sessionId: number,
  checklistId: number,
  data: SubmitChecklistRequest
): Promise<SubmitChecklistResponse> => {
  try {
    const formData = new FormData();

    // 명세서에 맞게 데이터 append
    // (보통 memberId는 토큰에서 가져오지만, 요청하신 타입대로 body에 넣습니다)
    formData.append('memberId', String(data.memberId));

    if (data.content) {
      formData.append('content', data.content);
    }

    if (data.file) {
      formData.append('file', data.file); // 명세서 Key: 'file'
    }

    // axios가 FormData를 감지하면 자동으로 Content-Type: multipart/form-data를 설정합니다.
    const response = await axiosInstance.post<SubmitChecklistResponse>(
      `/studyrooms/${groupId}/sessions/${sessionId}/checklists/${checklistId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('체크리스트 인증 제출 실패:', error);
    throw error;
  }
};
