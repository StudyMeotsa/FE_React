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
    description: string,
) => {
    try{
        const code = await axiosInstance.post('/studyrooms', {
            name,
            startDay,
            weekSession,
            totalWeek,
            maxMember,
            studyTimeAim,
            description
        });
        console.log('스터디룸 생성 성공(code):', code.data);
        return code.data;
    } catch (error: any) {
      throw {
        status: error?.response?.status,
        message: error?.response?.data?.message ?? error.message,
      };
    }
}
/*=========================================================================================*/


/*================================입장 코드 입력=============================================*/
export const EnterCode = async (code: string) => {
    const res = await axiosInstance.post('/studyrooms/join', {
        code: code.trim(),
    });
    return res.data as {success?: boolean; message?: string};
}

/*==========================================================================================*/


/*=================================스터디룸 정보=============================================*/
// export const studyroomInfo = async() => {
//     try()
// }
/*==========================================================================================*/

/*======================================스터디룸 목록========================================*/
export type Studyroom = {
  groupId: number;
  name: string;
  startDay: string;
  endDay: string;
  weekSession: number;
  totalSessions: number;
  studyTimeAim: number;
  currentMember: number;
  maxMember: number;
  sessionId: number;
  coffee: string | null;
  coffeeLevel: number | null;
};

export const studyroomList = async (): Promise<Studyroom[]> => {
    try{
        const res = await axiosInstance.get<Studyroom[]>('/studyrooms');
        console.log(res.data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)){
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