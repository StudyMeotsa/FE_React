import {axiosInstance} from '@/api/axiosinstance';

export const studyroomList = async() => {
    try{
        const response = await axiosInstance.get('/studyrooms');
        console.log('스터디룸 목록 불러오기 성공:', response.data);
        return response.data;
    } catch(error){
        console.error(error);
    }
}