import { postLogin } from '@/api/auth'; // API 함수 경로에 맞게 수정해주세요
import type { LoginRequest } from '@/types/auth.type'; // 타입 경로에 맞게 수정해주세요
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      // 1. API 요청
      const tokens = await postLogin(formData);

      // 2. 토큰 저장 (보통 로컬스토리지나 쿠키에 저장)
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      // 3. 페이지 이동
      alert('로그인에 성공했습니다!');
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900'>로그인</h2>
          <p className='mt-2 text-sm text-gray-600'>서비스 이용을 위해 로그인이 필요합니다.</p>
        </div>

        <form
          className='mt-8 space-y-6'
          onSubmit={handleSubmit}>
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <input
                name='email'
                type='text'
                required
                className='relative block w-full rounded-t-md border-0 px-3 py-3 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='아이디 (또는 이메일)'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name='password'
                type='password'
                required
                className='relative block w-full rounded-b-md border-0 px-3 py-3 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='비밀번호'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300'>
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </div>

          <div className='text-center text-sm'>
            <span className='text-gray-500'>계정이 없으신가요? </span>
            <Link
              to='/signup'
              className='font-semibold text-indigo-600 hover:text-indigo-500'>
              회원가입하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
