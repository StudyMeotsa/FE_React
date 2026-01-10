import { axiosInstance } from '@/api/axiosinstance';
import axios from 'axios';

/*=======================================스터디룸 생성=====================================*/
export const studyroomCreate = async (
  name: string,
  startDay: string,
  weekSession: number,
  totalWeek: number,
  maxMember: number,
  studyTimeAim: number,
  description: string
) => {
  try {
    const code = await axiosInstance.post('/studyrooms', {
      name,
      startDay,
      weekSession,
      totalWeek,
      maxMember,
      studyTimeAim,
      description,
    });

    console.log('스터디룸 생성 성공(code):', code.data);
    return code.data;
  } catch (error: any) {
    throw {
      status: error?.response?.status,
      message: error?.response?.data?.message ?? error.message,
    };
  }
};
/*=========================================================================================*/

/*================================입장 코드 입력=============================================*/
export const EnterCode = async (code: string) => {
  const res = await axiosInstance.post('/studyrooms/join', {
    code: code.trim(),
  });
  return res.data as { success?: boolean; message?: string };
};

/*==========================================================================================*/

/*=================================스터디룸 정보=============================================*/
export type StudyroomInfoType = {
  groupId: number;
  name: string;
  weekSession: number;
  totalWeek: number;
  studyTimeAim: number;
  maxMember: number;
  description: string;
  code: string;
};

export const studyroomInfo = async (groupId: number): Promise<StudyroomInfoType> => {
  try {
    const res = await axiosInstance.get<StudyroomInfoType>(`/studyrooms/${groupId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('studyroomInfo API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
/*==========================================================================================*/

/*======================================스터디룸 목록========================================*/
export type Studyroom = {
  groupId: number;
  sessionId: number;
  name: string;
  startDay: string;
  endDay: string;
  weekSession: number;
  totalSessions: number;
  studyTimeAim: number;
  currentMember: number;
  maxMember: number;
  sessionOrder: number; // JSON 데이터에 맞춰 추가됨
  coffeeImagePath: string;
};

export const studyroomList = async (): Promise<Studyroom[]> => {
  try {
    const res = await axiosInstance.get<Studyroom[]>('/studyrooms');
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('studyroomList API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }

    console.error('Unexpected error:', error);
    throw error;
  }
};

/*==========================================================================================*/

// 스터디룸 나가기
export type LeaveStudyroomResponse = {
  success: boolean;
};

export const leaveStudyroom = async (groupId: number): Promise<LeaveStudyroomResponse> => {
  try {
    const { data } = await axiosInstance.delete<LeaveStudyroomResponse>(
      `/studyrooms/${groupId}/leave`
    );
    return data;
  } catch (error) {
    console.error('스터디룸 나가기 실패:', error);
    throw error;
  }
};
