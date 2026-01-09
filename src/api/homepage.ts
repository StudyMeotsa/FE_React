import { axiosInstance } from '@/api/axiosinstance';
import axios from 'axios';

/* homepage 성별 */
export const getHomeData = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
};
