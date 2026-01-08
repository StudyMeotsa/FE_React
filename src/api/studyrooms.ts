import { axiosInstance } from '@/api/axiosinstance';

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