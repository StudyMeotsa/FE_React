import { axiosInstance } from '@/api/axiosinstance';

/* homepage 성별 */
export const getHomeData = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
};
