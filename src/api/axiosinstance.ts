import type { AuthToken } from '@/types/auth.type';
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// API 기본 설정
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --------------------------------------------------------------------------
// [1] 요청 인터셉터 (Request Interceptor)
// --------------------------------------------------------------------------
axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    const accessToken = localStorage.getItem('accessToken');

    // 토큰이 있다면 헤더에 추가
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    // 개발 환경 로그
    if (import.meta.env.DEV) {
      // console.log(`[🚀 요청] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

// --------------------------------------------------------------------------
// [2] 응답 인터셉터 (Response Interceptor)
// --------------------------------------------------------------------------
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  async function (error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const { response } = error;

    // ----------------------------------------------------------------------
    // [핵심] 401 에러 발생 시 리프레시 토큰 로직 진입
    // ----------------------------------------------------------------------
    if (response?.status === 401 && originalRequest) {
      // 1. 이미 재시도한 요청인지 체크 (무한 루프 방지)
      if (originalRequest._retry) {
        // 이미 재시도했는데도 실패했다면? -> 진짜 답 없는 상황. 로그아웃.
        handleLogout();
        return Promise.reject(error);
      }

      // 2. 재시도 플래그 설정
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        // 리프레시 토큰조차 없으면 바로 로그아웃
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // 3. 토큰 재발급 요청 (주의: axiosInstance 대신 깡 axios 사용)
        // axiosInstance를 쓰면 인터셉터가 또 돌아서 무한루프 빠질 수 있음
        const { data } = await axios.post<AuthToken>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken } // 명세서에 따른 Body
        );
        console.log('토큰 재발급 완료');

        // 4. 새로운 토큰 저장
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // 5. 실패했던 원래 요청의 헤더를 새 토큰으로 교체
        originalRequest.headers.set('Authorization', `Bearer ${data.accessToken}`);

        // 6. 원래 요청 다시 시도 (재발송)
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 (리프레시 토큰 만료 등) -> 강제 로그아웃
        console.error('리프레시 토큰 만료 또는 오류:', refreshError);
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    // 그 외 에러 처리
    handleCommonError(error);

    return Promise.reject(error);
  }
);

// --------------------------------------------------------------------------
// [3] 유틸리티 함수들
// --------------------------------------------------------------------------

// 로그아웃 처리 (스토리지 비우고 이동)
const handleLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // 현재 페이지가 이미 로그인 페이지가 아닐 때만 이동
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
  }
};

// 기타 에러 로깅
const handleCommonError = (error: AxiosError) => {
  if (import.meta.env.DEV) {
    console.error(`[🚨 API Error] ${error.response?.status}`, error.response?.data);
  }
};
