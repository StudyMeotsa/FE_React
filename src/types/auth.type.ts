// --------------------------------------------------------------------------
// [1] 공통 타입 및 유틸리티 (Shared Types)
// --------------------------------------------------------------------------

/**
 * 성별 타입 정의 (String Literal Union)
 */
export type Gender = 'M' | 'F';

/**
 * 기본 유저 정보 (User Entity)
 * - /auth/me 등에서 재사용될 수 있는 핵심 엔티티입니다.
 */
export interface User {
  email: string;
  name: string;
  sex: Gender;
}

/**
 * 인증 토큰 세트
 * - 로그인, 토큰 갱신 등에서 반복해서 쓰이는 구조입니다.
 */
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

// --------------------------------------------------------------------------
// [2] API 요청/응답 타입 (DTO: Data Transfer Object)
// --------------------------------------------------------------------------

// 1. 회원가입 (POST /auth/register)
export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string; // 프론트단 유효성 검사 등에서 필요할 수 있음
  name: string;
  sex: Gender;
}

// 2. 로그인 (POST /auth/login)
export interface LoginRequest {
  email: string; // 명세서에 'username'으로 되어있음 (이메일일 수도 있고 별도 ID일 수도 있음)
  password: string;
}

// 3. 로그아웃 (POST /auth/logout)
export interface LogoutRequest {
  refreshToken: string; // 로그아웃 시 리프레시 토큰을 서버로 보내 무효화
}

// 4. 토큰 재발급 (POST /auth/refresh)
export interface RefreshTokenRequest {
  refreshToken: string;
}
