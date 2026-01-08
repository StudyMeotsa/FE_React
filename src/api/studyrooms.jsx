import { axiosInstance } from '@/api/axiosinstance';

/*====================스터디룸 생성==================================*/
export const studyroomCreate = async (
    name,
    startDay,
    weekSession,
    totalWeek,
    maxMember,
    studyTimeAim,
    description
) => {
    try{
        const response = await axiosInstance.post('/studyrooms', {
            name,
            startDay,
            weekSession,
            totalWeek,
            maxMember,
            studyTimeAim,
            description
        });
        console.log('스터디룸 생성 성공(code):', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}